import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import medicalRecordModel from "../models/medicalRecordModel.js";
import transporter from "../config/nodeMailer.js";
import { json } from "express";

export const register = async (req, res) => {
    const { name, email, password, phone, role, specialization, licenseNumber } = req.body;
    if (!name || !email || !password) {
        return res.json({ success: false, message: "Missing Details" })
    }
    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            name,
            email,
            password: hashedPassword,
            phone: phone || '',
            role: role || 'patient'
        };

        // Add doctor-specific fields
        if (role === 'doctor') {
            userData.specialization = specialization || '';
            userData.licenseNumber = licenseNumber || '';
            userData.isVerifiedDoctor = false; // Doctors need admin verification
        }

        // Add default health stats for patients
        if (role === 'patient' || !role) {
            userData.healthStats = {
                heartRate: '75 bpm',
                bloodPressure: '120/80',
                weight: '70 kg',
                sleep: '7h'
            };
        }

        const user = new userModel(userData);
        await user.save();

        // Generate fake reports for new patient
        if (user.role === 'patient') {
            const reportTypes = ['Lab Report', 'Radiology', 'Prescription', 'Certificate', 'Other'];
            for (const type of reportTypes) {
                const record = new medicalRecordModel({
                    patientId: user._id,
                    title: `Fake ${type} for ${user.name}`,
                    type: type,
                    doctorName: 'Dr. AI',
                    description: `This is a generated fake ${type} report.`,
                    findings: 'Normal',
                    recommendation: 'Stay healthy'
                });
                await record.save();
            }
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'default_secret_key_123', { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to HealthCare Portal",
            text: `Welcome to HealthCare Portal! Your account has been created with email: ${email}. ${role === 'doctor' ? 'Your doctor account is pending verification.' : ''}`
        }

        try {
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.log("Email sending failed (Mock Mode active). Welcome email skipped.");
        }

        return res.json({ success: true, role: user.role })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: "Email and Password are required" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid Email" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'default_secret_key_123', { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true, token, role: user.role });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })
        return res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const sendVerifyOtp = async (req, res) => {
    console.log("sendVerifyOtp called")
    try {
        const { userId } = req.body;

        const user = await userModel.findById(userId);
        if (user.isVerified) {
            return res.json({ success: false, message: "User is already verified" });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpiredAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Your Verification OTP",
            text: `Your OTP for email verification is ${otp}. It is valid for 24 hours.`
        }
        try {
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.log(`Email failed. MOCK VERIFY OTP: ${otp}`);
        }
        res.json({ success: true, message: "OTP sent to your email" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
        return res.json({ success: false, message: "Missing Details" });
    }
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }
        if (user.verifyOtpExpiredAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired" });
        }
        user.isVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpiredAt = 0;
        await user.save();
        return res.json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
export const isAuthenticated = async (req, res) => {
    try {
        return res.json({
            success: true,
            message: "User is authenticated",
            userId: req.body.userId
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.json({ success: false, message: "Email is required" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpiredAt = Date.now() + 15 * 60 * 1000;
        await user.save();
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Your Password Reset OTP",
            text: `Your OTP for password reset is ${otp}. It is valid for 15 minutes.`
        };
        try {
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.log(`Email failed. MOCK RESET OTP: ${otp}`);
        }
        res.json({ success: true, message: "OTP sent to your email" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: "Missing details" })
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "user not found" });
        }
        if (user.resetOtp === '' || user.resetOtp != otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }
        if (user.resetOtpExpiredAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpiredAt = 0;
        await user.save();
        return res.json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}