import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
    addMedicalRecord,
    getPatientRecords,
    getRecordsByPatientId,
    updateMedicalRecord,
    deleteMedicalRecord,
    getAllRecords,
    seedFakeReports
} from "../controllers/medicalRecordController.js";

const recordRouter = express.Router();

// Patient routes
recordRouter.get('/my', userAuth, getPatientRecords);
recordRouter.post('/add', userAuth, addMedicalRecord);

// Doctor/Admin routes
recordRouter.get('/patient/:patientId', userAuth, getRecordsByPatientId);
recordRouter.put('/update/:recordId', userAuth, updateMedicalRecord);
recordRouter.delete('/delete/:recordId', userAuth, deleteMedicalRecord);

// Admin routes
recordRouter.get('/all', userAuth, getAllRecords);

// Seed route
recordRouter.get('/seed', seedFakeReports);

export default recordRouter;
