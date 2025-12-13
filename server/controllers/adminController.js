import userModel from "../models/userModel.js";
import appointmentModel from "../models/appointmentModel.js";
import medicalRecordModel from "../models/medicalRecordModel.js";
import bcrypt from "bcryptjs";

// Get admin dashboard stats
export const getAdminStats = async (req, res) => {
    try {
        const totalPatients = await userModel.countDocuments({ role: 'patient' });
        const totalDoctors = await userModel.countDocuments({ role: 'doctor' });
        const totalAppointments = await appointmentModel.countDocuments();
        const completedAppointments = await appointmentModel.countDocuments({ status: 'completed' });

        // Calculate revenue from completed appointments
        const revenueResult = await appointmentModel.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$fee' } } }
        ]);
        const revenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

        res.json({
            success: true,
            stats: {
                totalPatients,
                totalDoctors,
                totalAppointments,
                completedAppointments,
                revenue: `$${revenue.toLocaleString()}`
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get all patients
export const getAllPatients = async (req, res) => {
    try {
        const patients = await userModel.find({ role: 'patient' })
            .select('-password -verifyOtp -resetOtp -verifyOtpExpiredAt -resetOtpExpiredAt')
            .sort({ createdAt: -1 });

        res.json({ success: true, patients });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find()
            .select('-password -verifyOtp -resetOtp -verifyOtpExpiredAt -resetOtpExpiredAt')
            .sort({ createdAt: -1 });

        res.json({ success: true, users });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Add user (Admin)
export const addUser = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Name, email and password are required" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            phone: phone || '',
            role: role || 'patient',
            isVerified: true
        });

        await user.save();

        res.json({
            success: true,
            message: "User added successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Don't allow deleting self
        if (userId === req.userId) {
            return res.json({ success: false, message: "Cannot delete your own account" });
        }

        await userModel.findByIdAndDelete(userId);

        // Also delete related appointments
        await appointmentModel.deleteMany({
            $or: [{ patientId: userId }, { doctorId: userId }]
        });

        // Also delete medical records
        await medicalRecordModel.deleteMany({ patientId: userId });

        res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get recent activities
export const getRecentActivities = async (req, res) => {
    try {
        // Get recent appointments
        const recentAppointments = await appointmentModel.find()
            .sort({ createdAt: -1 })
            .limit(5);

        // Get recent registrations
        const recentUsers = await userModel.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name role createdAt');

        const activities = [];

        // Add user registrations
        recentUsers.forEach(user => {
            activities.push({
                id: user._id,
                type: 'registration',
                text: `New ${user.role} registered: ${user.name}`,
                time: getTimeAgo(user.createdAt),
                user: user.name.split(' ').map(n => n[0]).join('')
            });
        });

        // Add appointments
        recentAppointments.forEach(apt => {
            activities.push({
                id: apt._id,
                type: 'appointment',
                text: `Appointment: ${apt.patientName} with ${apt.doctorName}`,
                time: getTimeAgo(apt.createdAt),
                user: apt.patientName.split(' ').map(n => n[0]).join('')
            });
        });

        // Sort by time and limit
        activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json({ success: true, activities: activities.slice(0, 10) });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Helper function to get time ago
function getTimeAgo(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} mins ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
}

// Update user
export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;

        // Remove sensitive fields
        delete updates.password;
        delete updates.role;

        const user = await userModel.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true }
        ).select('-password -verifyOtp -resetOtp');

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "User updated", user });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
