import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const PatientDashboard = () => {
    const navigate = useNavigate();
    const { setIsLoggedin, setUserData, backendUrl, userData } = useContext(AppContext);

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/logout');
            if (data.success) {
                setIsLoggedin(false);
                setUserData(false);
                toast.success("Logged out successfully!");
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [notification, setNotification] = useState(null);

    // AI Symptom State
    const [symptoms, setSymptoms] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // AI Report State
    const [analyzingRecordId, setAnalyzingRecordId] = useState(null);
    const [reportAnalysis, setReportAnalysis] = useState(null);
    const [showReportModal, setShowReportModal] = useState(false);

    // AI Health Tip State
    const [healthTip, setHealthTip] = useState('');

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

    // Fetch Health Tip on Mount
    useEffect(() => {
        const fetchTip = async () => {
            try {
                // Mocking stats sending
                const stats = { heartRate: '72 bpm', bp: '120/80', weight: '70 kg', sleep: '7h 30m' };
                const response = await axios.post('http://localhost:4000/api/gemini/health-tips', { stats });
                if (response.data.success) {
                    setHealthTip(response.data.data.tip);
                }
            } catch (error) {
                console.error("Failed to fetch health tip", error);
                setHealthTip("Stay hydrated and keep moving!");
            }
        };
        fetchTip();
    }, []);

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // AI Symptom Analysis
    const handleAnalyzeSymptoms = async () => {
        if (!symptoms.trim()) return;

        setIsAnalyzing(true);
        try {
            const response = await axios.post('http://localhost:4000/api/gemini/classify', { symptoms });
            if (response.data.success) {
                const { specialization, urgency } = response.data.data;
                const recommendedDoctor = doctors.find(d => d.specialization === specialization) || doctors.find(d => d.specialization === 'General Medicine');

                if (recommendedDoctor) {
                    setSelectedDoctor(recommendedDoctor.id);
                    showNotification(`AI Recommendation: ${specialization} (${urgency})`, 'success');
                } else {
                    showNotification(`Suggested Specialist: ${specialization}`, 'info');
                }
            } else {
                showNotification('Could not analyze symptoms.', 'error');
            }
        } catch (error) {
            console.error(error);
            showNotification('AI Service Unavailable.', 'error');
        } finally {
            setIsAnalyzing(false);
        }
    };

    // AI Report Analysis
    const handleAnalyzeReport = async (record) => {
        setAnalyzingRecordId(record.id);
        try {
            const response = await axios.post('http://localhost:4000/api/gemini/analyze', {
                recordType: record.type,
                doctor: record.doctor,
                date: record.date
            });

            if (response.data.success) {
                setReportAnalysis(response.data.data);
                setShowReportModal(true);
            }
        } catch (error) {
            console.error(error);
            showNotification('Failed to analyze report.', 'error');
        } finally {
            setAnalyzingRecordId(null);
        }
    };

    const handleBookAppointment = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const doctorId = selectedDoctor || parseInt(formData.get('doctorId'));
        const date = formData.get('date');
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
            time: '09:00 AM',
            status: 'pending',
            type: type
        };

        setAppointments([newAppointment, ...appointments]);
        setShowBookingModal(false);
        setSymptoms('');
        showNotification('Appointment request sent successfully!');
        setActiveTab('appointments');
    };

    const renderDashboard = () => (
        <div className="animate-fadeIn">
            <div className="animate-fadeInUp" style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>
                        Hello, John! 👋
                    </h1>
                    {healthTip ? (
                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', borderLeft: '4px solid #10b981', padding: '1rem', borderRadius: '8px', marginTop: '0.5rem', maxWidth: '600px', backdropFilter: 'blur(10px)' }}>
                            <p style={{ color: '#6ee7b7', margin: 0, fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
                                <span style={{ fontSize: '1.2rem' }}>✨</span>
                                <span>{healthTip}</span>
                            </p>
                        </div>
                    ) : (
                        <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1.1rem' }}>Analyzing your health stats...</p>
                    )}
                </div>
                <button
                    className="btn-primary"
                    onClick={() => { setSelectedDoctor(null); setShowBookingModal(true); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem', marginTop: '1rem' }}
                >
                    <span>➕</span> Book Appointment
                </button>
            </div>

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
                        </div>
                    ))}
                    {appointments.length === 0 && <div style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '2rem' }}>No upcoming appointments.</div>}
                </div>

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
                {appointments.map((apt, index) => (
                    <div key={apt.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 2fr) 1fr 1fr 1fr 1fr', gap: '1rem', padding: '1.5rem', borderBottom: index !== appointments.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{apt.doctorName.includes('Sarah') ? '👩‍⚕️' : '👨‍⚕️'}</div>
                            <div>
                                <div style={{ color: 'white', fontWeight: 600 }}>{apt.doctorName}</div>
                                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{apt.specialization}</div>
                            </div>
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.8)' }}>
                            <div style={{ fontSize: '0.9rem' }}>{apt.date}</div>
                        </div>
                        <div><span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', fontSize: '0.85rem', fontWeight: 600 }}>{apt.type}</span></div>
                        <div><span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', background: apt.status === 'confirmed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: apt.status === 'confirmed' ? '#34d399' : '#fbbf24', fontSize: '0.85rem', fontWeight: 600 }}>{apt.status}</span></div>
                        <button className="btn-outline" style={{ padding: '0.5rem', borderRadius: '8px' }}>Reschedule</button>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderDoctors = () => {
        const filteredDoctors = doctors.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.specialization.toLowerCase().includes(searchQuery.toLowerCase()));
        return (
            <div className="animate-fadeIn">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white' }}>Find a Doctor</h2>
                    <input type="text" placeholder="Search..." className="input-field" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '300px', background: 'rgba(30, 41, 59, 0.6)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {filteredDoctors.map(doctor => (
                        <div key={doctor.id} className="glass-effect hover-lift" style={{ padding: '1.5rem', borderRadius: '24px', background: 'rgba(30, 41, 59, 0.6)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>{doctor.image}</div>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>{doctor.name}</h3>
                                    <p style={{ color: 'var(--primary-400)', fontWeight: 500 }}>{doctor.specialization}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}><span>⭐ {doctor.rating}</span></div>
                                </div>
                            </div>
                            <button className="btn-primary" onClick={() => { setSelectedDoctor(doctor.id); setShowBookingModal(true); }}>Book Appointment</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderRecords = () => (
        <div className="animate-fadeIn">
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '2rem' }}>Medical Records</h2>
            <div className="glass-effect" style={{ borderRadius: '24px', overflow: 'hidden', background: 'rgba(30, 41, 59, 0.6)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                            <th style={{ padding: '1.5rem', color: 'rgba(255,255,255,0.6)' }}>Document Name</th>
                            <th style={{ padding: '1.5rem', color: 'rgba(255,255,255,0.6)' }}>Date</th>
                            <th style={{ padding: '1.5rem', color: 'rgba(255,255,255,0.6)' }}>Type</th>
                            <th style={{ padding: '1.5rem', color: 'rgba(255,255,255,0.6)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map(record => (
                            <tr key={record.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} className="hover:bg-white/5">
                                <td style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ fontSize: '1.5rem' }}>📄</span>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>{record.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{record.size}</div>
                                    </div>
                                </td>
                                <td style={{ padding: '1.5rem' }}>{record.date}</td>
                                <td style={{ padding: '1.5rem' }}>
                                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', color: '#a78bfa', fontSize: '0.85rem', fontWeight: 600 }}>{record.type}</span>
                                </td>
                                <td style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            className="btn-primary"
                                            onClick={() => handleAnalyzeReport(record)}
                                            disabled={analyzingRecordId === record.id}
                                            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                                        >
                                            {analyzingRecordId === record.id ? '⌛' : '✨ Use AI'}
                                        </button>
                                        <button className="btn-icon">⬇️</button>
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
            {notification && (
                <div style={{ position: 'fixed', top: '20px', right: '20px', padding: '1rem 1.5rem', background: notification.type === 'success' ? '#10b981' : '#ef4444', color: 'white', borderRadius: '12px', zIndex: 2000 }}>
                    {notification.message}
                </div>
            )}

            <nav style={{ height: '70px', background: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', zIndex: 50 }}>
                <div className="navbar-brand" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <span>🏥</span> HealthPortal
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ color: 'white' }}>{userData?.name || 'John Doe'}</span>
                    <button
                        onClick={logout}
                        className="btn-outline"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <span>🚪</span> Logout
                    </button>
                </div>
            </nav>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                <aside style={{ width: '260px', background: 'rgba(30, 41, 59, 0.4)', borderRight: '1px solid rgba(255, 255, 255, 0.05)', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }} className="hide-mobile">
                    {['dashboard', 'appointments', 'doctors', 'records', 'settings'].map(id => (
                        <div key={id} onClick={() => setActiveTab(id)} style={{ padding: '0.875rem 1rem', borderRadius: '12px', cursor: 'pointer', color: activeTab === id ? 'white' : 'rgba(255, 255, 255, 0.6)', background: activeTab === id ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.2), transparent)' : 'transparent' }}>
                            {id.charAt(0).toUpperCase() + id.slice(1)}
                        </div>
                    ))}
                </aside>
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

            {/* Booking Modal */}
            {showBookingModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowBookingModal(false)}>
                    <div style={{ width: '90%', maxWidth: '500px', background: '#1e293b', borderRadius: '24px', padding: '2rem' }} onClick={e => e.stopPropagation()}>
                        <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '1rem' }}>Book Appointment</h2>
                        <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' }}>
                            <h3 style={{ color: '#60a5fa', fontSize: '1rem', marginBottom: '0.5rem' }}>✨ AI Specialist Matcher</h3>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input type="text" placeholder="Describe symptoms..." value={symptoms} onChange={e => setSymptoms(e.target.value)} className="input-field" style={{ flex: 1, background: 'rgba(0,0,0,0.2)' }} />
                                <button className="btn-primary" onClick={handleAnalyzeSymptoms} disabled={isAnalyzing || !symptoms}>{isAnalyzing ? '...' : 'Analyze'}</button>
                            </div>
                        </div>
                        <form onSubmit={handleBookAppointment}>
                            <select className="form-select" value={selectedDoctor || ''} onChange={e => setSelectedDoctor(parseInt(e.target.value))} required style={{ background: 'rgba(0,0,0,0.2)', color: 'white', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}>
                                <option value="" disabled>Select Doctor...</option>
                                {doctors.map(d => <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>)}
                            </select>
                            <input type="date" name="date" required className="input-field" style={{ background: 'rgba(0,0,0,0.2)', width: '100%', marginBottom: '1rem' }} />
                            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Confirm</button>
                        </form>
                    </div>
                </div>
            )}

            {/* AI Report Modal */}
            {showReportModal && reportAnalysis && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowReportModal(false)}>
                    <div style={{ width: '90%', maxWidth: '600px', background: '#1e293b', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(139, 92, 246, 0.3)', boxShadow: '0 0 50px rgba(139, 92, 246, 0.2)' }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '2rem' }}>✨</div>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>AI Analysis Result</h2>
                                <p style={{ color: 'rgba(255,255,255,0.6)' }}>Simplified summary of your medical record</p>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
                            <h3 style={{ color: '#a78bfa', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Summary</h3>
                            <p style={{ color: 'white', lineHeight: '1.6' }}>{reportAnalysis.summary}</p>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Key Findings</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {reportAnalysis.findings.map((finding, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                                        <span style={{ color: '#34d399' }}>✓</span> {finding}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
                            <h3 style={{ color: '#fbbf24', fontSize: '1rem', marginBottom: '0.25rem', fontWeight: 600 }}>Recommendation</h3>
                            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}>{reportAnalysis.recommendation}</p>
                        </div>

                        <button className="btn-primary" style={{ width: '100%', marginTop: '2rem', background: '#6366f1' }} onClick={() => setShowReportModal(false)}>
                            Close Analysis
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientDashboard;
