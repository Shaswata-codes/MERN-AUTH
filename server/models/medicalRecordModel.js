import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: { type: String, required: true },
    type: { type: String, enum: ['Lab Report', 'Radiology', 'Prescription', 'Certificate', 'Other'], default: 'Other' },
    doctorName: { type: String, default: '' },
    description: { type: String, default: '' },
    fileUrl: { type: String, default: '' },
    fileSize: { type: String, default: '' },
    findings: { type: String, default: '' },
    recommendation: { type: String, default: '' }
}, { timestamps: true });

const medicalRecordModel = mongoose.models.MedicalRecord || mongoose.model('medicalRecord', medicalRecordSchema);

export default medicalRecordModel;
