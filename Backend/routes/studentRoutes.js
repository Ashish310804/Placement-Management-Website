import express from 'express';
import { addStudent, getStudent } from '../controllers/studentController.js';
import { loginController, registerController, googleAuthController } from '../controllers/authController.js';
import { requestOtpController, verifyOtpController } from '../controllers/otpController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', addStudent);
router.get('/', verifyToken, getStudent);
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/google', googleAuthController);
router.post('/otp/request', requestOtpController);
router.post('/otp/verify', verifyOtpController);

export default router;