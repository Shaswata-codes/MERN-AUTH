import userModel from "../models/userModel.js";
import appointmentModel from "../models/appointmentModel.js";
import bcrypt from "bcryptjs";

// Get all doctors
export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await userModel.find({ role: 'doctor' })
            .select('-password -verifyOtp -resetOtp -verifyOtpExpiredAt -resetOtpExpiredAt');

        res.json({ success: true, doctors });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get single doctor
export const getDoctorById = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const doctor = await userModel.findById(doctorId)
            .select('-password -verifyOtp -resetOtp -verifyOtpExpiredAt -resetOtpExpiredAt');

        if (!doctor || doctor.role !== 'doctor') {
            return res.json({ success: false, message: "Doctor not found" });
        }

        res.json({ success: true, doctor });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Add new doctor (Admin only)
export const addDoctor = async (req, res) => {
    try {
        const { name, email, password, phone, specialization, licenseNumber, experience, fee, availability } = req.body;

        if (!name || !email || !password || !specialization) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const doctor = new userModel({
            name,
            email,
            password: hashedPassword,
            phone: phone || '',
            role: 'doctor',
            specialization,
            licenseNumber: licenseNumber || '',
            experience: experience || '',
            fee: fee || 0,
            availability: availability || 'Mon-Fri',
            isVerifiedDoctor: true,
            isVerified: true
        });

        await doctor.save();

        res.json({
            success: true,
            message: "Doctor added successfully",
            doctor: {
                _id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                specialization: doctor.specialization
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Update doctor
export const updateDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const updates = req.body;

        // Remove sensitive fields from updates
        delete updates.password;
        delete updates.role;

        const doctor = await userModel.findByIdAndUpdate(
            doctorId,
            { $set: updates },
            { new: true }
        ).select('-password -verifyOtp -resetOtp');

        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        res.json({ success: true, message: "Doctor updated successfully", doctor });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Delete doctor
export const deleteDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;

        // Cancel all pending appointments for this doctor
        await appointmentModel.updateMany(
            { doctorId, status: 'pending' },
            { status: 'cancelled' }
        );

        await userModel.findByIdAndDelete(doctorId);

        res.json({ success: true, message: "Doctor deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Verify doctor
export const verifyDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const doctor = await userModel.findByIdAndUpdate(
            doctorId,
            { isVerifiedDoctor: true },
            { new: true }
        );

        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        res.json({ success: true, message: "Doctor verified successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get doctor's appointments (for doctor dashboard)
export const getDoctorAppointments = async (req, res) => {
    try {
        const doctorId = req.userId;

        const appointments = await appointmentModel.find({ doctorId })
            .sort({ date: -1 });

        res.json({ success: true, appointments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get doctor stats
export const getDoctorStats = async (req, res) => {
    try {
        const doctorId = req.userId;

        const totalPatients = await appointmentModel.distinct('patientId', { doctorId });
        const todaysAppointments = await appointmentModel.countDocuments({
            doctorId,
            date: {
                $gte: new Date().setHours(0, 0, 0, 0),
                $lt: new Date().setHours(23, 59, 59, 999)
            }
        });
        const pendingReviews = await appointmentModel.countDocuments({
            doctorId,
            status: 'pending'
        });

        const doctor = await userModel.findById(doctorId);

        res.json({
            success: true,
            stats: {
                totalPatients: totalPatients.length,
                todaysAppointments,
                pendingReviews,
                rating: doctor?.rating || 4.5
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get patients for doctor
export const getDoctorPatients = async (req, res) => {
    try {
        const doctorId = req.userId;
        const patientIds = await appointmentModel.distinct('patientId', { doctorId });

        const patients = await userModel.find({ _id: { $in: patientIds } })
            .select('name email phone gender dateOfBirth healthStats');

        res.json({ success: true, patients });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Update doctor schedule
export const updateDoctorSchedule = async (req, res) => {
    try {
        const doctorId = req.userId;
        const { availability } = req.body;

        await userModel.findByIdAndUpdate(doctorId, { availability });

        res.json({ success: true, message: "Schedule updated successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
