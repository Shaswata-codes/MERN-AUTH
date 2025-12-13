import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import userModel from './models/userModel.js';
import appointmentModel from './models/appointmentModel.js';
import medicalRecordModel from './models/medicalRecordModel.js';
import 'dotenv/config';

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        if (process.env.MONGODB_URI) {
            await mongoose.connect(process.env.MONGODB_URI);
        } else {
            await mongoose.connect('mongodb://localhost:27017/mernAuth');
        }
        console.log('Connected to MongoDB');

        // Clear existing data
        await userModel.deleteMany({});
        await appointmentModel.deleteMany({});
        await medicalRecordModel.deleteMany({});
        console.log('Cleared existing data');

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        // Create Admin
        const admin = new userModel({
            name: 'Admin User',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin',
            isVerified: true
        });
        await admin.save();
        console.log('Admin created');

        // Create Doctors
        const doctorsData = [
            {
                name: 'Dr. Sarah Johnson',
                email: 'sarah@example.com',
                specialization: 'Cardiology',
                experience: '15 years',
                fee: 150,
                availability: 'Mon, Wed, Fri',
                rating: 4.8,
                gender: 'female'
            },
            {
                name: 'Dr. Michael Chen',
                email: 'michael@example.com',
                specialization: 'Dermatology',
                experience: '12 years',
                fee: 120,
                availability: 'Tue, Thu',
                rating: 4.9,
                gender: 'male'
            },
            {
                name: 'Dr. Emily Brown',
                email: 'emily@example.com',
                specialization: 'General Medicine',
                experience: '10 years',
                fee: 100,
                availability: 'Mon-Fri',
                rating: 4.7,
                gender: 'female'
            },
            {
                name: 'Dr. James Wilson',
                email: 'james@example.com',
                specialization: 'Orthopedics',
                experience: '18 years',
                fee: 180,
                availability: 'Wed, Sat',
                rating: 4.6,
                gender: 'male'
            }
        ];

        const doctors = [];
        for (const doc of doctorsData) {
            const newDoc = new userModel({
                ...doc,
                password: hashedPassword,
                role: 'doctor',
                isVerified: true,
                isVerifiedDoctor: true,
                phone: '1234567890'
            });
            await newDoc.save();
            doctors.push(newDoc);
        }
        console.log(`${doctors.length} Doctors created`);

        // Create Patients
        const patientsData = [
            {
                name: 'John Doe',
                email: 'john@example.com',
                gender: 'male',
                dateOfBirth: new Date('1990-01-01'),
                healthStats: {
                    heartRate: '72 bpm',
                    bloodPressure: '120/80',
                    weight: '75 kg',
                    height: '180 cm',
                    sleep: '7h 30m'
                }
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                gender: 'female',
                dateOfBirth: new Date('1995-05-15'),
                healthStats: {
                    heartRate: '68 bpm',
                    bloodPressure: '118/75',
                    weight: '60 kg',
                    height: '165 cm',
                    sleep: '8h'
                }
            }
        ];

        const patients = [];
        for (const pat of patientsData) {
            const newPat = new userModel({
                ...pat,
                password: hashedPassword,
                role: 'patient',
                isVerified: true,
                phone: '0987654321'
            });
            await newPat.save();
            patients.push(newPat);
        }
        console.log(`${patients.length} Patients created`);

        // Create Appointments
        const appointments = [
            {
                patientId: patients[0]._id,
                doctorId: doctors[0]._id,
                patientName: patients[0].name,
                doctorName: doctors[0].name,
                specialization: doctors[0].specialization,
                date: new Date(new Date().setDate(new Date().getDate() + 2)), // 2 days from now
                time: '10:00 AM',
                type: 'In-Person',
                status: 'confirmed',
                fee: doctors[0].fee
            },
            {
                patientId: patients[0]._id,
                doctorId: doctors[1]._id,
                patientName: patients[0].name,
                doctorName: doctors[1].name,
                specialization: doctors[1].specialization,
                date: new Date(new Date().setDate(new Date().getDate() - 5)), // 5 days ago
                time: '02:30 PM',
                type: 'Video',
                status: 'completed',
                fee: doctors[1].fee
            },
            {
                patientId: patients[1]._id,
                doctorId: doctors[2]._id,
                patientName: patients[1].name,
                doctorName: doctors[2].name,
                specialization: doctors[2].specialization,
                date: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
                time: '09:00 AM',
                type: 'In-Person',
                status: 'pending',
                fee: doctors[2].fee
            }
        ];

        for (const apt of appointments) {
            await new appointmentModel(apt).save();
        }
        console.log(`${appointments.length} Appointments created`);

        // Create Medical Records
        const records = [
            {
                patientId: patients[0]._id,
                doctorId: doctors[2]._id,
                title: 'Annual Physical Checkup',
                type: 'Lab Report',
                doctorName: doctors[2].name,
                description: 'Routine blood work and physical examination.',
                findings: 'All vitals normal. Cholesterol slightly elevated.',
                recommendation: 'Dietary changes and regular exercise.',
                fileSize: '2.5 MB'
            },
            {
                patientId: patients[0]._id,
                doctorId: doctors[3]._id,
                title: 'Knee X-Ray',
                type: 'Radiology',
                doctorName: doctors[3].name,
                description: 'X-ray of right knee due to pain.',
                findings: 'Minor hairline fracture detected.',
                recommendation: 'Rest and physiotherapy.',
                fileSize: '15 MB'
            }
        ];

        for (const rec of records) {
            await new medicalRecordModel(rec).save();
        }
        console.log(`${records.length} Medical Records created`);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
