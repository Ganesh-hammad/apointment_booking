import express from 'express'
import { appointmentCancelled, appointmentComplete, appointmentsDoctor, doctorDashboard, doctorList, doctorProfile, loginDoctor, updatedoctorProfile } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList);
doctorRouter.post('/logindoctor', loginDoctor);
doctorRouter.get('/appointments',authDoctor, appointmentsDoctor );
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete);
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancelled);
doctorRouter.get('/dashboard', authDoctor, doctorDashboard);
doctorRouter.get('/profile', authDoctor, doctorProfile);
doctorRouter.post('/update-profile', authDoctor, updatedoctorProfile);

export default doctorRouter;
