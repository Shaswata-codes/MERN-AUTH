import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    patientName: { type: String, required: true },
    doctorName: { type: String, required: true },
    specialization: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    type: { type: String, enum: ['In-Person', 'Video'], default: 'In-Person' },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
    reason: { type: String, default: '' },
    notes: { type: String, default: '' },
    fee: { type: Number, default: 0 }
}, { timestamps: true });

const appointmentModel = mongoose.models.Appointment || mongoose.model('appointment', appointmentSchema);

export default appointmentModel;
