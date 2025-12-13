import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [notification, setNotification] = useState(null);

    // Mock Data - Doctors
    const [doctors] = useState([
        { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiology', rating: 4.8, experience: '15 years', image: '👩‍⚕️', availability: 'Mon, Wed, Fri', fee: '$150' },
        { id: 2, name: 'Dr. Michael Chen', specialization: 'Dermatology', rating: 4.9, experience: '12 years', image: '👨‍⚕️', availability: 'Tue, Thu', fee: '$120' },
        { id: 3, name: 'Dr. Emily Brown', specialization: 'General Medicine', rating: 4.7, experience: '10 years', image: '👩‍⚕️', availability: 'Mon-Fri', fee: '$100' },
        { id: 4, name: 'Dr. James Wilson', specialization: 'Orthopedics', rating: 4.6, experience: '18 years', image: '👨‍⚕️', availability: 'Wed, Sat', fee: '$180' },
        { id: 5, name: 'Dr. Linda Martinez', specialization: 'Pediatrics', rating: 4.9, experience: '14 years', image: '👩‍⚕️', availability: 'Mon-Thu', fee: '$130' },
        { id: 6, name: 'Dr. Robert Taylor', specialization: 'Neurology', rating: 4.9, experience: '20 years', image: '👨‍⚕️', availability: 'Fri', fee: '$250' },
    ]);

    // Mock Data - Appointments
    const [appointments, setAppointments] = useState([
        { id: 1, doctorId: 1, doctorName: 'Dr. Sarah Johnson', specialization: 'Cardiology', date: '2025-12-15', time: '10:00 AM', status: 'confirmed', type: 'In-Person' },
        { id: 2, doctorId: 2, doctorName: 'Dr. Michael Chen', specialization: 'Dermatology', date: '2025-12-18', time: '02:30 PM', status: 'pending', type: 'Video' }
    ]);

    // Mock Data - Medical Records
    const [records] = useState([
        { id: 1, title: 'Annual Blood Test Results', date: '2025-11-10', doctor: 'Dr. Emily Brown', type: 'Lab Report', size: '2.4 MB' },
        { id: 2, title: 'X-Ray Right Shoulder', date: '2025-10-05', doctor: 'Dr. James Wilson', type: 'Radiology', size: '15 MB' },
        { id: 3, title: 'Vaccination History', date: '2025-01-15', doctor: 'Dr. Linda Martinez', type: 'Certificate', size: '1.1 MB' },
        { id: 4, title: 'Prescription - Antibiotics', date: '2025-09-20', doctor: 'Dr. Emily Brown', type: 'Prescription', size: '0.5 MB' }
    ]);

    // Mock Data - Health Stats
    const healthStats = [
        { label: 'Heart Rate', value: '72 bpm', icon: '❤️', color: 'var(--coral-500)', trend: '+2%' },
        { label: 'Blood Pressure', value: '120/80', icon: '🩺', color: 'var(--primary-500)', trend: 'Normal' },
        { label: 'Weight', value: '70 kg', icon: '⚖️', color: 'var(--accent-500)', trend: '-1kg' },
        { label: 'Sleep', value: '7h 30m', icon: '🌙', color: 'var(--purple-500)', trend: '+30m' }
    ];

    // Show Notification Helper
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // Form Handling
    const handleBookAppointment = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const doctorId = selectedDoctor || parseInt(formData.get('doctorId'));
        const date = formData.get('date');
        const notes = formData.get('notes');
        const type = formData.get('type') || 'In-Person';

        const doctor = doctors.find(d => d.id === doctorId);

        if (!doctor || !date) {
            showNotification('Please select a doctor and date', 'error');
            return;
        }

        const newAppointment = {
            id: appointments.length + 1,
            doctorId: doctor.id,
            doctorName: doctor.name,
            specialization: doctor.specialization,
            date: date,
            time: '09:00 AM', // Mock time
            status: 'pending',
            type: type
        };

        setAppointments([newAppointment, ...appointments]);
        setShowBookingModal(false);
        showNotification('Appointment request sent successfully!');
        setActiveTab('appointments');
    };

    // Render Views
    const renderDashboard = () => (
        <div className="animate-fadeIn">
            <div className="animate-fadeInUp" style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>
                        Hello, John! 👋
                    </h1>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1.1rem' }}>
                        Here's your health overview for today.
                    </p>
                </div>
                <button
                    className="btn-primary"
                    onClick={() => { setSelectedDoctor(null); setShowBookingModal(true); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem' }}
                >
                    <span>➕</span> Book Appointment
                </button>
            </div>

            {/* Stats */}
            <div className="animate-fadeInUp stagger-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {healthStats.map((stat, i) => (
                    <div key={i} className="glass-effect hover-lift" style={{ padding: '1.5rem', borderRadius: '20px', background: 'rgba(30, 41, 59, 0.6)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `rgba(255, 255, 255, 0.05)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                                {stat.icon}
                            </div>
                            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: stat.trend.includes('+') ? 'var(--success)' : stat.trend === 'Normal' ? 'var(--info)' : 'var(--warning)', background: 'rgba(255, 255, 255, 0.05)', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                                {stat.trend}
                            </span>
                        </div>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>{stat.value}</h3>
                        <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>{stat.label}</p>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem' }}>
                {/* Upcoming */}
                <div className="glass-effect" style={{ padding: '2rem', borderRadius: '24px', background: 'rgba(30, 41, 59, 0.6)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>Upcoming Appointments</h2>
                        <button className="btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => setActiveTab('appointments')}>View All</button>
                    </div>
                    {appointments.slice(0, 2).map((apt) => (
                        <div key={apt.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '16px', marginBottom: '1rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>
                                {apt.doctorName === 'Dr. Michael Chen' ? '👨‍⚕️' : '👩‍⚕️'}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ color: 'white', marginBottom: '0.25rem', fontWeight: 600 }}>{apt.doctorName}</h4>
                                <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>{apt.specialization}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ color: 'white', fontWeight: 600, marginBottom: '0.25rem' }}>{apt.time}</div>
                                <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.85rem' }}>{apt.date}</div>
                            </div>
                        </div>
                    ))}
                    {appointments.length === 0 && <div style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '2rem' }}>No upcoming appointments.</div>}
                </div>

                {/* Top Doctors */}
                <div className="glass-effect" style={{ padding: '2rem', borderRadius: '24px', background: 'rgba(30, 41, 59, 0.6)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>Top Doctors</h2>
                        <button className="btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => setActiveTab('doctors')}>Find More</button>
                    </div>
                    {doctors.slice(0, 3).map(doc => (
                        <div key={doc.id} style={{ padding: '1rem', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.03)', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', cursor: 'pointer', transition: 'background 0.2s' }} className="hover:bg-white/5">
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgb(29, 36, 50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>{doc.image}</div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ color: 'white', fontSize: '0.95rem', marginBottom: '0.1rem' }}>{doc.name}</h4>
                                <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem' }}>{doc.specialization} • ⭐ {doc.rating}</p>
                            </div>
                            <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '8px' }} onClick={() => { setSelectedDoctor(doc.id); setShowBookingModal(true); }}>
                                Book
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderAppointments = () => (
        <div className="animate-fadeIn">
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '2rem' }}>My Appointments</h2>
            <div className="glass-effect" style={{ borderRadius: '24px', overflow: 'hidden', background: 'rgba(30, 41, 59, 0.6)' }}>
                {appointments.length > 0 ? (
                    appointments.map((apt, index) => (
                        <div key={apt.id} style={{
                            display: 'grid',
                            gridTemplateColumns: 'minmax(200px, 2fr) 1fr 1fr 1fr 1fr',
                            gap: '1rem',
                            padding: '1.5rem',
                            borderBottom: index !== appointments.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                            alignItems: 'center'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                    {apt.doctorName.includes('Sarah') || apt.doctorName.includes('Emily') ? '👩‍⚕️' : '👨‍⚕️'}
                                </div>
                                <div>
                                    <div style={{ color: 'white', fontWeight: 600 }}>{apt.doctorName}</div>
                                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{apt.specialization}</div>
                                </div>
                            </div>
                            <div style={{ color: 'rgba(255,255,255,0.8)' }}>
                                <div style={{ fontSize: '0.9rem' }}>{apt.date}</div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{apt.time}</div>
                            </div>
                            <div>
                                <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', fontSize: '0.85rem', fontWeight: 600 }}>
                                    {apt.type}
                                </span>
                            </div>
                            <div>
                                <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', background: apt.status === 'confirmed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: apt.status === 'confirmed' ? '#34d399' : '#fbbf24', fontSize: '0.85rem', fontWeight: 600 }}>
                                    {apt.status}
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="btn-outline" style={{ padding: '0.5rem', borderRadius: '8px' }}>Reschedule</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                        You have no appointments. <span style={{ color: 'var(--primary-400)', cursor: 'pointer', fontWeight: 600 }} onClick={() => { setSelectedDoctor(null); setShowBookingModal(true); }}>Book one now</span>.
                    </div>
                )}
            </div>
        </div>
    );

    const renderDoctors = () => {
        const filteredDoctors = doctors.filter(d =>
            d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.specialization.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div className="animate-fadeIn">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white' }}>Find a Doctor</h2>
                    <input
                        type="text"
                        placeholder="Search by name or specialization..."
                        className="input-field"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: '300px', background: 'rgba(30, 41, 59, 0.6)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {filteredDoctors.map(doctor => (
                        <div key={doctor.id} className="glass-effect hover-lift" style={{ padding: '1.5rem', borderRadius: '24px', background: 'rgba(30, 41, 59, 0.6)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                                    {doctor.image}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>{doctor.name}</h3>
                                    <p style={{ color: 'var(--primary-400)', fontWeight: 500 }}>{doctor.specialization}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                                        <span>⭐ {doctor.rating}</span>
                                        <span>•</span>
                                        <span>{doctor.experience}</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', fontSize: '0.9rem' }}>
                                <div style={{ color: 'rgba(255,255,255,0.7)' }}>Availability<br /><span style={{ color: 'white', fontWeight: 600 }}>{doctor.availability}</span></div>
                                <div style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'right' }}>Consultation<br /><span style={{ color: 'white', fontWeight: 600 }}>{doctor.fee}</span></div>
                            </div>

                            <button
                                className="btn-primary"
                                style={{ width: '100%', marginTop: 'auto' }}
                                onClick={() => { setSelectedDoctor(doctor.id); setShowBookingModal(true); }}
                            >
                                Book Appointment
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderRecords = () => (
        <div className="animate-fadeIn">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white' }}>Medical Records</h2>
                <button className="btn-secondary">Upload New Record</button>
            </div>

            <div className="glass-effect" style={{ borderRadius: '24px', overflow: 'hidden', background: 'rgba(30, 41, 59, 0.6)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                            <th style={{ padding: '1.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Document Name</th>
                            <th style={{ padding: '1.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Date</th>
                            <th style={{ padding: '1.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Prescribed By</th>
                            <th style={{ padding: '1.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Type</th>
                            <th style={{ padding: '1.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map(record => (
                            <tr key={record.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} className="hover:bg-white/5">
                                <td style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ fontSize: '1.5rem' }}>📄</span>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>{record.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{record.size}</div>
                                    </div>
                                </td>
                                <td style={{ padding: '1.5rem', color: 'rgba(255,255,255,0.8)' }}>{record.date}</td>
                                <td style={{ padding: '1.5rem', color: 'rgba(255,255,255,0.8)' }}>{record.doctor}</td>
                                <td style={{ padding: '1.5rem' }}>
                                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', color: '#a78bfa', fontSize: '0.85rem', fontWeight: 600 }}>
                                        {record.type}
                                    </span>
                                </td>
                                <td style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn-icon" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', width: '32px', height: '32px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👁️</button>
                                        <button className="btn-icon" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', width: '32px', height: '32px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⬇️</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: '#0f172a' }}>

            {/* Notification Toast */}
            {notification && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    padding: '1rem 1.5rem',
                    background: notification.type === 'success' ? '#10b981' : '#ef4444',
                    color: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    zIndex: 2000,
                    animation: 'slideInRight 0.3s ease-out',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontWeight: 600
                }}>
                    <span>{notification.type === 'success' ? '✅' : '⚠️'}</span>
                    {notification.message}
                </div>
            )}

            {/* Top Navigation Bar */}
            <nav style={{ height: '70px', background: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', zIndex: 50 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className="navbar-brand" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
                        <span>🏥</span>
                        <span className="hide-mobile">HealthPortal</span>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <button className="btn-icon" style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', position: 'relative' }}>
                            🔔
                            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: 'var(--error)', borderRadius: '50%' }}></span>
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--primary-500), var(--purple-500))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>
                                JD
                            </div>
                            <div className="hide-mobile" style={{ lineHeight: 1.2 }}>
                                <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>John Doe</div>
                                <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>Patient ID: #8832</div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Sidebar */}
                <aside style={{ width: '260px', background: 'rgba(30, 41, 59, 0.4)', borderRight: '1px solid rgba(255, 255, 255, 0.05)', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }} className="hide-mobile">
                    {[
                        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                        { id: 'appointments', label: 'Appointments', icon: '📅' },
                        { id: 'doctors', label: 'Find Doctors', icon: '👨‍⚕️' },
                        { id: 'records', label: 'Medical Records', icon: '📋' },
                        { id: 'settings', label: 'Settings', icon: '⚙️' },
                    ].map(item => (
                        <div
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            style={{
                                padding: '0.875rem 1rem',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                color: activeTab === item.id ? 'white' : 'rgba(255, 255, 255, 0.6)',
                                background: activeTab === item.id ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.2), transparent)' : 'transparent',
                                borderLeft: activeTab === item.id ? '3px solid var(--primary-500)' : '3px solid transparent',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                            <span style={{ fontWeight: 500 }}>{item.label}</span>
                        </div>
                    ))}

                    <div style={{ marginTop: 'auto' }}>
                        <div onClick={() => navigate('/login')} style={{ padding: '0.875rem 1rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--coral-400)', transition: 'all 0.3s ease' }}>
                            <span style={{ fontSize: '1.2rem' }}>🚪</span>
                            <span style={{ fontWeight: 500 }}>Logout</span>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main style={{ flex: 1, overflowY: 'auto', padding: '2rem', background: 'radial-gradient(circle at top right, rgba(30, 58, 138, 0.2), transparent 40%)' }}>
                    <div className="container-custom" style={{ maxWidth: '1200px', margin: '0 0', padding: 0 }}>
                        {activeTab === 'dashboard' && renderDashboard()}
                        {activeTab === 'appointments' && renderAppointments()}
                        {activeTab === 'doctors' && renderDoctors()}
                        {activeTab === 'records' && renderRecords()}
                        {activeTab === 'settings' && navigate('/settings')}
                    </div>
                </main>
            </div>

            {/* Booking Modal Overlay */}
            {showBookingModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s ease-out' }} onClick={() => setShowBookingModal(false)}>
                    <div style={{ width: '90%', maxWidth: '500px', background: '#1e293b', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', animation: 'scaleIn 0.3s ease-out' }} onClick={e => e.stopPropagation()}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '1.5rem' }}>Book Appointment</h2>
                        <form onSubmit={handleBookAppointment}>
                            <div className="form-group">
                                <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Select Specialist</label>
                                <select name="doctorId" className="form-select" defaultValue={selectedDoctor || ''} required style={{ background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <option value="" disabled>Choose a doctor...</option>
                                    {doctors.map(d => <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Appointment Type</label>
                                <select name="type" className="form-select" style={{ background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <option value="In-Person">In-Person Visit</option>
                                    <option value="Video">Video Consultation</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Preferred Date</label>
                                <input type="date" name="date" className="input-field" required style={{ background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }} />
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Notes (Optional)</label>
                                <textarea name="notes" className="input-field" rows="3" placeholder="Briefly describe your symptoms..." style={{ background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', resize: 'none' }}></textarea>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setShowBookingModal(false)}>Cancel</button>
                                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Confirm Booking</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientDashboard;
