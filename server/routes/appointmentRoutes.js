import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
    bookAppointment,
    getPatientAppointments,
    getDoctorAppointments,
    getTodaysAppointments,
    updateAppointmentStatus,
    cancelAppointment,
    rescheduleAppointment,
    getAllAppointments
} from "../controllers/appointmentController.js";

const appointmentRouter = express.Router();

// Patient routes
appointmentRouter.post('/book', userAuth, bookAppointment);
appointmentRouter.get('/patient', userAuth, getPatientAppointments);

// Doctor routes  
appointmentRouter.get('/doctor', userAuth, getDoctorAppointments);
appointmentRouter.get('/doctor/today', userAuth, getTodaysAppointments);

// Common routes
appointmentRouter.put('/status/:appointmentId', userAuth, updateAppointmentStatus);
appointmentRouter.put('/cancel/:appointmentId', userAuth, cancelAppointment);
appointmentRouter.put('/reschedule/:appointmentId', userAuth, rescheduleAppointment);

// Admin routes
appointmentRouter.get('/all', userAuth, getAllAppointments);

export default appointmentRouter;
