import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
    getAllDoctors,
    getDoctorById,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    verifyDoctor,
    getDoctorAppointments,
    getDoctorStats,
    getDoctorPatients,
    updateDoctorSchedule
} from "../controllers/doctorController.js";

const doctorRouter = express.Router();

// Public routes
doctorRouter.get('/list', getAllDoctors);
doctorRouter.get('/:doctorId', getDoctorById);

// Protected routes (require authentication)
doctorRouter.post('/add', userAuth, addDoctor);
doctorRouter.put('/update/:doctorId', userAuth, updateDoctor);
doctorRouter.delete('/delete/:doctorId', userAuth, deleteDoctor);
doctorRouter.post('/verify/:doctorId', userAuth, verifyDoctor);

// Doctor dashboard routes
doctorRouter.get('/my/appointments', userAuth, getDoctorAppointments);
doctorRouter.get('/my/stats', userAuth, getDoctorStats);
doctorRouter.get('/my/patients', userAuth, getDoctorPatients);
doctorRouter.put('/my/schedule', userAuth, updateDoctorSchedule);

export default doctorRouter;
