import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Mock data
    const upcomingAppointments = [
        {
            id: 1,
            doctor: 'Dr. Sarah Johnson',
            specialization: 'Cardiology',
            date: '2025-12-15',
            time: '10:00 AM',
            status: 'confirmed',
            avatar: '👩‍⚕️'
        },
        {
            id: 2,
            doctor: 'Dr. Michael Chen',
            specialization: 'Dermatology',
            date: '2025-12-18',
            time: '2:30 PM',
            status: 'pending',
            avatar: '👨‍⚕️'
        }
    ];

    const healthStats = [
        { label: 'Heart Rate', value: '72 bpm', icon: '❤️', color: 'var(--coral-500)', trend: '+2%' },
        { label: 'Blood Pressure', value: '120/80', icon: '🩺', color: 'var(--primary-500)', trend: 'Normal' },
        { label: 'Weight', value: '70 kg', icon: '⚖️', color: 'var(--accent-500)', trend: '-1kg' },
        { label: 'Sleep', value: '7h 30m', icon: '🌙', color: 'var(--purple-500)', trend: '+30m' }
    ];

    const availableDoctors = [
        { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiology', rating: 4.8, experience: '15 years', image: '👩‍⚕️' },
        { id: 2, name: 'Dr. Michael Chen', specialization: 'Dermatology', rating: 4.9, experience: '12 years', image: '👨‍⚕️' },
        { id: 3, name: 'Dr. Emily Brown', specialization: 'General Medicine', rating: 4.7, experience: '10 years', image: '👩‍⚕️' },
        { id: 4, name: 'Dr. James Wilson', specialization: 'Orthopedics', rating: 4.6, experience: '18 years', image: '👨‍⚕️' }
    ];

    return (
        <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: '#0f172a' }}>

            {/* Top Navigation Bar */}
            <nav style={{
                height: '70px',
                background: 'rgba(30, 41, 59, 0.8)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 2rem',
                zIndex: 50
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className="navbar-brand" style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>🏥</span>
                        <span className="hide-mobile">HealthPortal</span>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ position: 'relative', display: 'none' }} className="hide-mobile">
                        <input
                            type="text"
                            placeholder="Search doctors, records..."
                            className="input-field"
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                padding: '0.5rem 1rem 0.5rem 2.5rem',
                                width: '300px',
                                color: 'white'
                            }}
                        />
                        <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <button className="btn-icon" style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', position: 'relative' }}>
                            🔔
                            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: 'var(--error)', borderRadius: '50%' }}></span>
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
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
                <aside style={{
                    width: '260px',
                    background: 'rgba(30, 41, 59, 0.4)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                    padding: '2rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                }} className="hide-mobile">
                    {[
                        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                        { id: 'appointments', label: 'Appointments', icon: '📅' },
                        { id: 'doctors', label: 'Find Doctors', icon: '👨‍⚕️' },
                        { id: 'records', label: 'Medical Records', icon: '📋' },
                        { id: 'prescriptions', label: 'Prescriptions', icon: '💊' },
                        { id: 'history', label: 'History', icon: '⏳' },
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
                        <div
                            onClick={() => navigate('/login')}
                            style={{
                                padding: '0.875rem 1rem',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                color: 'var(--coral-400)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>🚪</span>
                            <span style={{ fontWeight: 500 }}>Logout</span>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main style={{ flex: 1, overflowY: 'auto', padding: '2rem', background: 'radial-gradient(circle at top right, rgba(30, 58, 138, 0.2), transparent 40%)' }}>
                    <div className="container-custom" style={{ maxWidth: '1200px', margin: '0 0', padding: 0 }}>

                        {/* Welcome Header */}
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
                                onClick={() => setShowBookingModal(true)}
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem' }}
                            >
                                <span>➕</span> Book Appointment
                            </button>
                        </div>

                        {/* Health Stats Grid */}
                        <div className="animate-fadeInUp stagger-1" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                            gap: '1.5rem',
                            marginBottom: '2.5rem'
                        }}>
                            {healthStats.map((stat, i) => (
                                <div key={i} className="glass-effect hover-lift" style={{ padding: '1.5rem', borderRadius: '20px', background: 'rgba(30, 41, 59, 0.6)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '14px',
                                            background: `rgba(255, 255, 255, 0.05)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem'
                                        }}>
                                            {stat.icon}
                                        </div>
                                        <span style={{
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            color: stat.trend.includes('+') ? 'var(--success)' : stat.trend === 'Normal' ? 'var(--info)' : 'var(--warning)',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '20px'
                                        }}>
                                            {stat.trend}
                                        </span>
                                    </div>
                                    <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>
                                        {stat.value}
                                    </h3>
                                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Two Column Layout */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))', gap: '2rem' }}>

                            {/* Upcoming Appointments */}
                            <div className="animate-fadeInUp stagger-2" style={{
                                background: 'rgba(30, 41, 59, 0.6)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '24px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                padding: '2rem',
                                height: 'fit-content'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>Upcoming Appointments</h2>
                                    <span style={{ color: 'var(--primary-400)', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 600 }}>View All</span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {upcomingAppointments.map((apt) => (
                                        <div key={apt.id} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            padding: '1rem',
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            borderRadius: '16px',
                                            border: '1px solid rgba(255, 255, 255, 0.05)',
                                            transition: 'all 0.3s ease'
                                        }} className="hover:bg-white/5">
                                            <div style={{
                                                width: '56px',
                                                height: '56px',
                                                borderRadius: '16px',
                                                background: 'rgba(59, 130, 246, 0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.75rem'
                                            }}>
                                                {apt.avatar}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ color: 'white', marginBottom: '0.25rem', fontWeight: 600 }}>{apt.doctor}</h4>
                                                <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>{apt.specialization}</p>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ color: 'white', fontWeight: 600, marginBottom: '0.25rem' }}>{apt.time}</div>
                                                <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.85rem' }}>{apt.date}</div>
                                            </div>
                                            <div style={{
                                                padding: '0.5rem 1rem',
                                                borderRadius: '12px',
                                                background: apt.status === 'confirmed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                                color: apt.status === 'confirmed' ? 'var(--accent-400)' : 'var(--warning)',
                                                fontSize: '0.85rem',
                                                fontWeight: 600
                                            }}>
                                                {apt.status}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Available Doctors (Mini) */}
                            <div className="animate-fadeInUp stagger-3" style={{
                                background: 'rgba(30, 41, 59, 0.6)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '24px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                padding: '2rem',
                                height: 'fit-content'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>Top Doctors</h2>
                                    <span style={{ color: 'var(--primary-400)', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 600 }}>Find More</span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {availableDoctors.slice(0, 3).map(doc => (
                                        <div key={doc.id} style={{
                                            padding: '1rem',
                                            borderRadius: '16px',
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}>
                                            <div style={{
                                                width: '48px',
                                                height: '48px',
                                                borderRadius: '50%',
                                                background: 'var(--neutral-700)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.5rem'
                                            }}>{doc.image}</div>

                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ color: 'white', fontSize: '0.95rem', marginBottom: '0.1rem' }}>{doc.name}</h4>
                                                <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem' }}>{doc.specialization} • ⭐ {doc.rating}</p>
                                            </div>

                                            <button className="btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '8px' }}>
                                                Profile
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>

            {/* Booking Modal Overlay */}
            {showBookingModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'fadeIn 0.2s ease-out'
                }} onClick={() => setShowBookingModal(false)}>
                    <div style={{
                        width: '90%',
                        maxWidth: '500px',
                        background: '#1e293b',
                        borderRadius: '24px',
                        padding: '2rem',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                        animation: 'scaleIn 0.3s ease-out'
                    }} onClick={e => e.stopPropagation()}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '1.5rem' }}>Book New Appointment</h2>

                        <div className="form-group">
                            <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Select Specialist</label>
                            <select className="form-select" style={{ background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <option>Choose a doctor...</option>
                                {availableDoctors.map(d => <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>)}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Preferred Date</label>
                            <input type="date" className="input-field" style={{ background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }} />
                        </div>

                        <div className="form-group">
                            <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Notes</label>
                            <textarea className="input-field" rows="3" placeholder="Briefly describe your symptoms..." style={{ background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}></textarea>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setShowBookingModal(false)}>Cancel</button>
                            <button className="btn-primary" style={{ flex: 1 }}>Confirm Booking</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientDashboard;
