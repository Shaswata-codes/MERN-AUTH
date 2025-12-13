import medicalRecordModel from "../models/medicalRecordModel.js";
import userModel from "../models/userModel.js";

// Add medical record
export const addMedicalRecord = async (req, res) => {
    try {
        const { patientId, title, type, doctorName, description, findings, recommendation } = req.body;
        const creatorId = req.userId;

        // Determine patient ID - if not provided, use the current user (patient adding their own record)
        const targetPatientId = patientId || creatorId;

        if (!title) {
            return res.json({ success: false, message: "Title is required" });
        }

        const record = new medicalRecordModel({
            patientId: targetPatientId,
            doctorId: creatorId,
            title,
            type: type || 'Other',
            doctorName: doctorName || '',
            description: description || '',
            findings: findings || '',
            recommendation: recommendation || ''
        });

        await record.save();

        res.json({ success: true, message: "Record added successfully", record });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get patient's medical records
export const getPatientRecords = async (req, res) => {
    try {
        const patientId = req.userId;

        const records = await medicalRecordModel.find({ patientId })
            .sort({ createdAt: -1 });

        res.json({ success: true, records });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get specific patient's records (for doctor/admin)
export const getRecordsByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;

        const records = await medicalRecordModel.find({ patientId })
            .sort({ createdAt: -1 });

        res.json({ success: true, records });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Update medical record
export const updateMedicalRecord = async (req, res) => {
    try {
        const { recordId } = req.params;
        const updates = req.body;

        const record = await medicalRecordModel.findByIdAndUpdate(
            recordId,
            { $set: updates },
            { new: true }
        );

        if (!record) {
            return res.json({ success: false, message: "Record not found" });
        }

        res.json({ success: true, message: "Record updated", record });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Delete medical record
export const deleteMedicalRecord = async (req, res) => {
    try {
        const { recordId } = req.params;

        await medicalRecordModel.findByIdAndDelete(recordId);

        res.json({ success: true, message: "Record deleted" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get all records (Admin)
export const getAllRecords = async (req, res) => {
    try {
        const records = await medicalRecordModel.find()
            .populate('patientId', 'name email')
            .sort({ createdAt: -1 })
            .limit(100);

        res.json({ success: true, records });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Seed fake reports for all patients
export const seedFakeReports = async (req, res) => {
    try {
        const patients = await userModel.find({ role: 'patient' });
        const reportTypes = ['Lab Report', 'Radiology', 'Prescription', 'Certificate', 'Other'];
        let createdCount = 0;

        for (const patient of patients) {
            for (const type of reportTypes) {
                const existing = await medicalRecordModel.findOne({ patientId: patient._id, type });
                if (!existing) {
                    const record = new medicalRecordModel({
                        patientId: patient._id,
                        title: `Fake ${type} for ${patient.name}`,
                        type: type,
                        doctorName: 'Dr. AI',
                        description: `This is a generated fake ${type} report.`,
                        findings: 'Normal',
                        recommendation: 'Stay healthy'
                    });
                    await record.save();
                    createdCount++;
                }
            }
        }
        res.json({ success: true, message: `Created ${createdCount} fake reports.` });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
