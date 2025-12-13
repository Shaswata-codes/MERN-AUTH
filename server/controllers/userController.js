import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId;

        const user = await userModel.findById(userId)
            .select('-password -verifyOtp -resetOtp -verifyOtpExpiredAt -resetOtpExpiredAt');

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        return res.json({
            success: true,
            userData: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                isAccountVerified: user.isVerified,
                // Doctor specific
                specialization: user.specialization,
                licenseNumber: user.licenseNumber,
                experience: user.experience,
                fee: user.fee,
                availability: user.availability,
                rating: user.rating,
                isVerifiedDoctor: user.isVerifiedDoctor,
                // Patient specific
                dateOfBirth: user.dateOfBirth,
                gender: user.gender,
                bloodGroup: user.bloodGroup,
                address: user.address,
                emergencyContact: user.emergencyContact,
                healthStats: user.healthStats
            }
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const updates = req.body;

        // Remove sensitive fields from updates
        delete updates.password;
        delete updates.email;
        delete updates.role;

        const user = await userModel.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true }
        ).select('-password -verifyOtp -resetOtp');

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        return res.json({
            success: true,
            message: "Profile updated successfully",
            userData: user
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const updateHealthStats = async (req, res) => {
    try {
        const userId = req.userId;
        const { healthStats } = req.body;

        const user = await userModel.findByIdAndUpdate(
            userId,
            { $set: { healthStats } },
            { new: true }
        ).select('-password -verifyOtp -resetOtp');

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        return res.json({
            success: true,
            message: "Health stats updated",
            healthStats: user.healthStats
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
