import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: '' },
    role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },

    // Doctor-specific fields
    specialization: { type: String, default: '' },
    licenseNumber: { type: String, default: '' },
    experience: { type: String, default: '' },
    fee: { type: Number, default: 0 },
    availability: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    isVerifiedDoctor: { type: Boolean, default: false },

    // Patient-specific fields
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other', ''], default: '' },
    bloodGroup: { type: String, default: '' },
    address: { type: String, default: '' },
    emergencyContact: { type: String, default: '' },

    // Health stats (for patients)
    healthStats: {
        heartRate: { type: String, default: '' },
        bloodPressure: { type: String, default: '' },
        weight: { type: String, default: '' },
        height: { type: String, default: '' },
        sleep: { type: String, default: '' }
    },

    // Auth fields
    verifyOtp: { type: String, default: '' },
    verifyOtpExpiredAt: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: '' },
    resetOtpExpiredAt: { type: Number, default: 0 }
}, { timestamps: true });

const userModel = mongoose.models.User || mongoose.model('user', userSchema);

export default userModel;