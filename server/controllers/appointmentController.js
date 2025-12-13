import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// Book appointment (Patient)
export const bookAppointment = async (req, res) => {
    try {
        const patientId = req.userId;
        const { doctorId, date, time, type, reason } = req.body;

        if (!doctorId || !date) {
            return res.json({ success: false, message: "Doctor and date are required" });
        }

        const patient = await userModel.findById(patientId);
        const doctor = await userModel.findById(doctorId);

        if (!patient) {
            return res.json({ success: false, message: "Patient not found" });
        }

        if (!doctor || doctor.role !== 'doctor') {
            return res.json({ success: false, message: "Doctor not found" });
        }

        const appointment = new appointmentModel({
            patientId,
            doctorId,
            patientName: patient.name,
            doctorName: doctor.name,
            specialization: doctor.specialization,
            date: new Date(date),
            time: time || '09:00 AM',
            type: type || 'In-Person',
            reason: reason || '',
            fee: doctor.fee || 0,
            status: 'pending'
        });

        await appointment.save();

        res.json({
            success: true,
            message: "Appointment booked successfully",
            appointment
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get patient's appointments
export const getPatientAppointments = async (req, res) => {
    try {
        const patientId = req.userId;

        const appointments = await appointmentModel.find({ patientId })
            .sort({ date: -1 });

        res.json({ success: true, appointments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get doctor's appointments
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

// Get today's appointments for doctor
export const getTodaysAppointments = async (req, res) => {
    try {
        const doctorId = req.userId;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const appointments = await appointmentModel.find({
            doctorId,
            date: { $gte: today, $lt: tomorrow }
        }).sort({ time: 1 });

        res.json({ success: true, appointments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Update appointment status (Doctor/Admin)
export const updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { status, notes } = req.body;

        const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
        if (status && !validStatuses.includes(status)) {
            return res.json({ success: false, message: "Invalid status" });
        }

        const updateData = {};
        if (status) updateData.status = status;
        if (notes) updateData.notes = notes;

        const appointment = await appointmentModel.findByIdAndUpdate(
            appointmentId,
            { $set: updateData },
            { new: true }
        );

        if (!appointment) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        res.json({ success: true, message: "Appointment updated", appointment });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Cancel appointment
export const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const userId = req.userId;

        const appointment = await appointmentModel.findById(appointmentId);

        if (!appointment) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        // Check if user is authorized to cancel
        if (appointment.patientId.toString() !== userId && appointment.doctorId.toString() !== userId) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        appointment.status = 'cancelled';
        await appointment.save();

        res.json({ success: true, message: "Appointment cancelled" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Reschedule appointment
export const rescheduleAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { date, time } = req.body;

        if (!date) {
            return res.json({ success: false, message: "New date is required" });
        }

        const appointment = await appointmentModel.findByIdAndUpdate(
            appointmentId,
            {
                date: new Date(date),
                time: time || '09:00 AM',
                status: 'pending'  // Reset to pending after reschedule
            },
            { new: true }
        );

        if (!appointment) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        res.json({ success: true, message: "Appointment rescheduled", appointment });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get all appointments (Admin)
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointmentModel.find()
            .sort({ createdAt: -1 })
            .limit(100);

        res.json({ success: true, appointments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
