import bcrypt from 'bcrypt';
import Otp from '../models/otp.js';
import Student from '../models/student.js';
import CompanyAccount from '../models/companyAccount.js';
import { createAuthToken, sanitizeUser, validateEmail, validatePassword } from '../services/authService.js';
import { compareOtp, generateOtp, hashOtp, isOtpExpired } from '../services/otpService.js';
import { sendOtpEmail } from '../services/emailService.js';

const normalizeEmail = (email) => email.trim().toLowerCase();
const OTP_TTL_MS = 5 * 60 * 1000;
const OTP_RATE_LIMIT_MS = 60 * 1000;
const MAX_ATTEMPTS = 5;


const getAccountModel = (role) => (role === 'company' ? CompanyAccount : Student);
const isValidRole = (role) => role === 'student' || role === 'company';
const isValidPurpose = (purpose) => purpose === 'signup' || purpose === 'password-reset';

export const requestOtpController = async (req, res) => {
  try {
    const { email, purpose = 'signup', role = 'student' } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const normalizedEmail = normalizeEmail(email);
    if (!validateEmail(normalizedEmail)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (!isValidRole(role) || !isValidPurpose(purpose)) {
      return res.status(400).json({ success: false, message: 'Invalid OTP request.' });
    }

    const account = await getAccountModel(role).findOne({ email: normalizedEmail });
    if (purpose === 'signup' && account) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }
    if (purpose === 'password-reset' && !account) {
      return res.status(404).json({ success: false, message: 'No account was found for this email.' });
    }

    const existingOtp = await Otp.findOne({ email: normalizedEmail, purpose, role });
    if (existingOtp) {
      const coolDownRemaining = existingOtp.lastSentAt && new Date(existingOtp.lastSentAt).getTime() + OTP_RATE_LIMIT_MS > Date.now();
      if (coolDownRemaining) {
        return res.status(429).json({ success: false, message: 'Please wait 60 seconds before requesting another OTP.' });
      }
    }

    const otp = generateOtp();
    const otpHash = await hashOtp(otp);
    const expiresAt = new Date(Date.now() + OTP_TTL_MS);

    const otpRecord = await Otp.findOneAndUpdate(
      { email: normalizedEmail, purpose, role },
      {
        otpHash,
        expiresAt,
        attempts: 0,
        lastSentAt: new Date(),
        purpose,
        role,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    try {
      await sendOtpEmail({ email: normalizedEmail, otp, purpose });
    } catch (error) {
      await Otp.deleteOne({ _id: otpRecord._id });
      throw error;
    }

    res.status(200).json({ success: true, message: 'OTP sent to your email.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'OTP request failed.' });
  }
};

export const verifyOtpController = async (req, res) => {
  try {
    const { email, otp, password, name, course, skills, companyName, role = 'student' } = req.body;
    const purpose = req.body.purpose || 'signup';

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
    }

    const normalizedEmail = normalizeEmail(email);
    if (!isValidRole(role) || !isValidPurpose(purpose)) {
      return res.status(400).json({ success: false, message: 'Invalid OTP verification request.' });
    }
    const otpEntry = await Otp.findOne({ email: normalizedEmail, purpose, role });

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

    const Account = getAccountModel(role);
    const existingAccount = await Account.findOne({ email: normalizedEmail });

    if (!validatePassword(password || '')) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.' });
    }

    let account;
    if (purpose === 'password-reset') {
      if (!existingAccount) {
        return res.status(404).json({ success: false, message: 'No account was found for this email.' });
      }
      existingAccount.password = await bcrypt.hash(password, 10);
      await existingAccount.save();
      account = existingAccount;
    } else {
      if (existingAccount) {
        return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
      }
      if (role === 'student' && (!name || !course || !skills)) {
        return res.status(400).json({ success: false, message: 'Please provide your name, course, and skills to create an account.' });
      }
      if (role === 'company' && !companyName) {
        return res.status(400).json({ success: false, message: 'Please provide your company name to create an account.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      account = role === 'student'
        ? await Student.create({ name: name.trim(), email: normalizedEmail, password: hashedPassword, course: course.trim(), skills: skills.trim(), role: 'student', authProvider: 'local' })
        : await CompanyAccount.create({ companyName: companyName.trim(), email: normalizedEmail, password: hashedPassword });
    }

    await Otp.deleteOne({ _id: otpEntry._id });

    const token = createAuthToken(account);
    res.status(200).json({
      success: true,
      message: purpose === 'password-reset' ? 'Password reset successfully.' : 'Account created successfully.',
      token,
      user: sanitizeUser(account),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'OTP verification failed.' });
  }
};
