import jwt from 'jsonwebtoken';
import Student from '../models/student.js';

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication token is missing.' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'placement-secret');
    const student = await Student.findById(decodedToken.id).select('-password');

    if (!student) {
      return res.status(401).json({ success: false, message: 'User not found.' });
    }

    req.user = decodedToken;
    req.student = student;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};