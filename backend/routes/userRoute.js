import express from 'express'
import { bookAppointment, cancelAppointment, getProfile, listAppointment, razorpayPayment, registerUser, updateProfile, userLogin, verifyPayment } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', userLogin);
userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile);
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/appointments', authUser, listAppointment)
userRouter.post('/cancel-appointments', authUser, cancelAppointment)
userRouter.post('/razorpay', authUser, razorpayPayment)
userRouter.post('/verifyPayment', authUser, verifyPayment)
export default userRouter;