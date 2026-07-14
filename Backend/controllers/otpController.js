import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import Otp from '../models/otp.js';
import Student from '../models/student.js';
import { createAuthToken, sanitizeUser, validateEmail, validatePassword } from '../services/authService.js';
import { compareOtp, generateOtp, hashOtp, isOtpExpired } from '../services/otpService.js';

const normalizeEmail = (email) => email.trim().toLowerCase();
const OTP_TTL_MS = 5 * 60 * 1000;
const OTP_RATE_LIMIT_MS = 60 * 1000;
const MAX_ATTEMPTS = 5;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtpEmail = async (email, otp) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return;
  }

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Placement Portal',
    html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
  });
};

export const requestOtpController = async (req, res) => {
  try {
    const { email, purpose = 'signup' } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const normalizedEmail = normalizeEmail(email);
    if (!validateEmail(normalizedEmail)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    const existingOtp = await Otp.findOne({ email: normalizedEmail, purpose });
    if (existingOtp) {
      const coolDownRemaining = existingOtp.lastSentAt && new Date(existingOtp.lastSentAt).getTime() + OTP_RATE_LIMIT_MS > Date.now();
      if (coolDownRemaining) {
        return res.status(429).json({ success: false, message: 'Please wait 60 seconds before requesting another OTP.' });
      }
    }

    const otp = generateOtp();
    const otpHash = await hashOtp(otp);
    const expiresAt = new Date(Date.now() + OTP_TTL_MS);

    await Otp.findOneAndUpdate(
      { email: normalizedEmail, purpose },
      {
        otpHash,
        expiresAt,
        attempts: 0,
        lastSentAt: new Date(),
        purpose,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    await sendOtpEmail(normalizedEmail, otp);

    res.status(200).json({ success: true, message: 'OTP sent to your email.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'OTP request failed.' });
  }
};

export const verifyOtpController = async (req, res) => {
  try {
    const { email, otp, password, name, course, skills } = req.body;
    const purpose = req.body.purpose || 'signup';

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
    }

    const normalizedEmail = normalizeEmail(email);
    const otpEntry = await Otp.findOne({ email: normalizedEmail, purpose });

    if (!otpEntry) {
      return res.status(404).json({ success: false, message: 'OTP not found. Request a new one.' });
    }

    if (otpEntry.attempts >= MAX_ATTEMPTS) {
      await Otp.deleteOne({ _id: otpEntry._id });
      return res.status(429).json({ success: false, message: 'Too many failed attempts. Request a new OTP.' });
    }

    if (isOtpExpired(otpEntry.expiresAt)) {
      await Otp.deleteOne({ _id: otpEntry._id });
      return res.status(410).json({ success: false, message: 'OTP has expired. Request a new one.' });
    }

    const isOtpValid = await compareOtp(otp, otpEntry.otpHash);
    if (!isOtpValid) {
      otpEntry.attempts += 1;
      await otpEntry.save();
      return res.status(401).json({ success: false, message: `Invalid OTP. ${MAX_ATTEMPTS - otpEntry.attempts} attempt(s) remaining.` });
    }

    const existingStudent = await Student.findOne({ email: normalizedEmail });
    let student;

    if (existingStudent) {
      if (!existingStudent.password && password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingStudent.password = hashedPassword;
        await existingStudent.save();
      }
      student = existingStudent;
    } else {
      if (!name || !password || !course || !skills) {
        return res.status(400).json({ success: false, message: 'Please provide your name, password, course, and skills to create an account.' });
      }

      if (!validatePassword(password)) {
        return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      student = await Student.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        course: course.trim(),
        skills: skills.trim(),
        role: 'student',
        authProvider: 'local',
      });
    }

    await Otp.deleteOne({ _id: otpEntry._id });

    const token = createAuthToken(student);
    res.status(200).json({
      success: true,
      message: existingStudent ? 'Login successful.' : 'Account created successfully.',
      token,
      user: sanitizeUser(student),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'OTP verification failed.' });
  }
};
