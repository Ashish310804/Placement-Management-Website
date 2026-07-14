import bcrypt from 'bcrypt';
import Student from '../models/student.js';
import { createAuthToken, sanitizeUser, validateEmail, validatePassword } from '../services/authService.js';

const normalizeEmail = (email) => email.trim().toLowerCase();

export const registerController = async (req, res) => {
  try {
    const { name, email, password, course, skills } = req.body;

    if (!name || !email || !password || !course || !skills) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    const normalizedEmail = normalizeEmail(email);

    if (!validateEmail(normalizedEmail)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.',
      });
    }

    const existingUser = await Student.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = await Student.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      course: course.trim(),
      skills: skills.trim(),
      role: 'student',
      authProvider: 'local',
    });

    const token = createAuthToken(student);

    res.status(201).json({
      success: true,
      message: 'Student registered successfully.',
      token,
      user: sanitizeUser(student),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Registration failed.' });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const normalizedEmail = normalizeEmail(email);
    const student = await Student.findOne({ email: normalizedEmail });

    if (!student) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    if (student.authProvider !== 'local' || !student.password) {
      return res.status(401).json({ success: false, message: 'Please sign in with Google or use the correct account type.' });
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = createAuthToken(student);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: sanitizeUser(student),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Login failed.' });
  }
};

export const googleAuthController = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ success: false, message: 'Google credential is required.' });
    }

    const { OAuth2Client } = await import('google-auth-library');
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload?.email) {
      return res.status(400).json({ success: false, message: 'Google account email could not be verified.' });
    }

    const normalizedEmail = normalizeEmail(payload.email);
    let student = await Student.findOne({ email: normalizedEmail });

    if (!student) {
      student = await Student.create({
        name: payload.name || 'Google User',
        email: normalizedEmail,
        password: null,
        course: 'Not provided',
        skills: 'Not provided',
        role: 'student',
        authProvider: 'google',
        googleId: payload.sub,
        profilePicture: payload.picture || '',
      });
    } else if (!student.googleId && payload.sub) {
      student.googleId = payload.sub;
      student.profilePicture = payload.picture || student.profilePicture || '';
      student.authProvider = 'google';
      await student.save();
    }

    const token = createAuthToken(student);

    res.status(200).json({
      success: true,
      message: 'Google login successful.',
      token,
      user: sanitizeUser(student),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Google authentication failed.' });
  }
};
