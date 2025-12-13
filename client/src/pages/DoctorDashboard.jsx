import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Mock data
    const todaysAppointments = [
        { id: 1, patient: 'John Doe', time: '09:00 AM', reason: 'Regular Checkup', status: 'confirmed', type: 'In-Person' },
        { id: 2, patient: 'Jane Smith', time: '10:30 AM', reason: 'Skin Rash Consultation', status: 'confirmed', type: 'Video' },
        { id: 3, patient: 'Robert Johnson', time: '02:00 PM', reason: 'Hypertension Follow-up', status: 'pending', type: 'In-Person' },
        { id: 4, patient: 'Emily Davis', time: '04:00 PM', reason: 'Lab Results Review', status: 'confirmed', type: 'Video' }
    ];

    const stats = [
        { label: 'Total Patients', value: '1,284', icon: '👥', color: 'var(--primary-500)', trend: '+12%' },
        { label: 'Appointments Today', value: '8', icon: '📅', color: 'var(--accent-500)', trend: 'Busy' },
        { label: 'Pending Reviews', value: '3', icon: '📝', color: 'var(--warning)', trend: 'Urgent' },
        { label: 'Average Rating', value: '4.9', icon: '⭐', color: 'var(--purple-500)', trend: 'Excellent' }
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
                        <span className="hide-mobile">HealthPortal <span style={{ fontSize: '0.8rem', opacity: 0.6, fontWeight: 400 }}>Doctor</span></span>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <button className="btn-icon" style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', position: 'relative' }}>
                            🔔
                            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: 'var(--error)', borderRadius: '50%' }}></span>
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--accent-500), var(--primary-500))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>
                                DS
                            </div>
                            <div className="hide-mobile" style={{ lineHeight: 1.2 }}>
                                <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>Dr. Sarah</div>
                                <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>Cardiologist</div>
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
                        { id: 'dashboard', label: 'Overview', icon: '📊' },
                        { id: 'appointments', label: 'Appointments', icon: '📅' },
                        { id: 'patients', label: 'My Patients', icon: '👥' },
                        { id: 'schedule', label: 'Schedule', icon: '⏳' },
                        { id: 'messages', label: 'Messages', icon: '💬' },
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
                                background: activeTab === item.id ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.2), transparent)' : 'transparent',
                                borderLeft: activeTab === item.id ? '3px solid var(--accent-500)' : '3px solid transparent',
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
                <main style={{ flex: 1, overflowY: 'auto', padding: '2rem', background: 'radial-gradient(circle at top left, rgba(16, 185, 129, 0.1), transparent 40%)' }}>
                    <div className="container-custom" style={{ maxWidth: '1200px', margin: '0 0', padding: 0 }}>

                        {/* Welcome Header */}
                        <div className="animate-fadeInUp" style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>
                                    Doctor Dashboard
                                </h1>
                                <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1.1rem' }}>
                                    Manage your schedule and patient care efficiently.
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem' }}>
                                    <span>📅</span> Manage Schedule
                                </button>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="animate-fadeInUp stagger-1" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                            gap: '1.5rem',
                            marginBottom: '2.5rem'
                        }}>
                            {stats.map((stat, i) => (
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
                                            color: 'var(--accent-400)',
                                            background: 'rgba(16, 185, 129, 0.1)',
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

                        {/* Today's Appointments */}
                        <div className="animate-fadeInUp stagger-2" style={{
                            background: 'rgba(30, 41, 59, 0.6)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '24px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            padding: '2rem',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>Today's Appointments</h2>
                                <span style={{ color: 'var(--accent-400)', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 600 }}>View Calendar</span>
                            </div>

                            <div className="table-container" style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
                                <div className="table-header" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '1rem', display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr', padding: '1rem' }}>
                                    <div>Patient</div>
                                    <div>Reason</div>
                                    <div>Time</div>
                                    <div>Type</div>
                                    <div>Action</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {todaysAppointments.map(apt => (
                                        <div key={apt.id} style={{
                                            display: 'grid',
                                            gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr',
                                            padding: '1rem',
                                            background: 'rgba(255,255,255,0.02)',
                                            borderRadius: '12px',
                                            alignItems: 'center',
                                            transition: 'background 0.2s'
                                        }} className="hover:bg-white/5">
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--neutral-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                                                    {apt.patient.split(' ')[0][0]}
                                                </div>
                                                <span style={{ fontWeight: 600, color: 'white' }}>{apt.patient}</span>
                                            </div>
                                            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{apt.reason}</div>
                                            <div style={{ fontWeight: 600, color: 'white' }}>{apt.time}</div>
                                            <div>
                                                <span className={`badge ${apt.type === 'Video' ? 'badge-purple' : 'badge-info'}`}>
                                                    {apt.type}
                                                </span>
                                            </div>
                                            <div>
                                                <button className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>View</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default DoctorDashboard;
