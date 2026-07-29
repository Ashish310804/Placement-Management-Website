
import express from 'express';
import {addCompany,getCompany,getCompanyById, updateCompany,deleteCompany} from '../controllers/companyController.js'
import { verifyToken } from '../middleware/auth.js';
import { isAdmin } from '../middleware/admin.js';
import { loginController } from '../controllers/authController.js';
import { requestOtpController, verifyOtpController } from '../controllers/otpController.js';
const router = express.Router();

router.post('/login', loginController);
router.post('/otp/request', requestOtpController);
router.post('/otp/verify', verifyOtpController);

router.post('/',verifyToken,isAdmin,addCompany)
router.get('/',getCompany)
router.get('/:id',getCompanyById)
router.put('/:id',verifyToken,isAdmin,updateCompany)
router.delete('/:id',verifyToken,isAdmin,deleteCompany)

export default router;
