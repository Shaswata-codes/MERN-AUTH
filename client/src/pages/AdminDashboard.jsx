import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showAddModal, setShowAddModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Mock data
    const systemStats = {
        totalPatients: 1234,
        totalDoctors: 56,
        totalAppointments: 3456,
        revenue: '$124,500'
    };

    const recentActivities = [
        { id: 1, type: 'registration', text: 'New patient registered: John Doe', time: '5 mins ago', user: 'JD' },
        { id: 2, type: 'appointment', text: 'Appointment booked: Jane Smith with Dr. Brown', time: '15 mins ago', user: 'JS' },
        { id: 3, type: 'doctor', text: 'New doctor verification: Dr. Michael Chen', time: '1 hour ago', user: 'MC' },
        { id: 4, type: 'system', text: 'System backup completed successfully', time: '2 hours ago', user: 'SYS' }
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
                        <span className="hide-mobile">HealthPortal <span style={{ fontSize: '0.8rem', opacity: 0.6, fontWeight: 400 }}>Admin</span></span>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <button className="btn-icon" style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', position: 'relative' }}>
                            🔔
                            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: 'var(--error)', borderRadius: '50%' }}></span>
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--coral-500), var(--warning))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>
                                AD
                            </div>
                            <div className="hide-mobile" style={{ lineHeight: 1.2 }}>
                                <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>Admin User</div>
                                <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>Super Admin</div>
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
                        { id: 'doctors', label: 'Doctors', icon: '👨‍⚕️' },
                        { id: 'patients', label: 'Patients', icon: '👥' },
                        { id: 'appointments', label: 'Appointments', icon: '📅' },
                        { id: 'reports', label: 'Reports', icon: '📉' },
                        { id: 'settings', label: 'System Settings', icon: '⚙️' },
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
                                background: activeTab === item.id ? 'linear-gradient(90deg, rgba(239, 68, 68, 0.2), transparent)' : 'transparent',
                                borderLeft: activeTab === item.id ? '3px solid var(--coral-500)' : '3px solid transparent',
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
                <main style={{ flex: 1, overflowY: 'auto', padding: '2rem', background: 'radial-gradient(circle at bottom right, rgba(244, 63, 94, 0.1), transparent 40%)' }}>
                    <div className="container-custom" style={{ maxWidth: '1200px', margin: '0 0', padding: 0 }}>

                        {/* Welcome Header */}
                        <div className="animate-fadeInUp" style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>
                                    System Overview
                                </h1>
                                <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1.1rem' }}>
                                    Monitor system performance and user statistics.
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    className="btn-primary"
                                    onClick={() => { setModalType('doctor'); setShowAddModal(true); }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem', background: 'var(--coral-600)' }}
                                >
                                    <span>👨‍⚕️</span> Add Doctor
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
                            {[
                                { label: 'Total Patients', value: systemStats.totalPatients.toLocaleString(), icon: '👥', color: 'var(--primary-500)' },
                                { label: 'Active Doctors', value: systemStats.totalDoctors, icon: '👨‍⚕️', color: 'var(--accent-500)' },
                                { label: 'Appointments', value: systemStats.totalAppointments.toLocaleString(), icon: '📅', color: 'var(--purple-500)' },
                                { label: 'Total Revenue', value: systemStats.revenue, icon: '💰', color: 'var(--warning)' }
                            ].map((stat, i) => (
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
                                    </div>
                                    <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '0.25rem' }}>
                                        {stat.value}
                                    </h3>
                                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="card-premium" style={{ padding: '2rem', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>
                                Quick Actions
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                <button
                                    className="btn-primary"
                                    onClick={() => {
                                        setModalType('doctor');
                                        setShowAddModal(true);
                                    }}
                                    style={{ padding: '1rem' }}
                                >
                                    ➕ Add Doctor
                                </button>
                                <button
                                    className="btn-secondary"
                                    onClick={() => {
                                        setModalType('patient');
                                        setShowAddModal(true);
                                    }}
                                    style={{ padding: '1rem' }}
                                >
                                    ➕ Add Patient
                                </button>
                                <button className="btn-primary" style={{ padding: '1rem', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
                                    📊 View Reports
                                </button>
                                <button className="btn-secondary" style={{ padding: '1rem', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>
                                    ⚙️ System Settings
                                </button>
                            </div>
                        </div>

                        {/* Recent Activities */}
                        <div className="card-premium" style={{ padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>
                                Recent Activities
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {recentActivities.map(activity => (
                                    <div key={activity.id} style={{
                                        padding: '1rem',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        background: 'rgba(255,255,255,0.02)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                background: activity.type === 'registration' ? 'var(--accent-500)' :
                                                    activity.type === 'appointment' ? 'var(--primary-500)' : 'var(--neutral-500)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.25rem'
                                            }}>
                                                {activity.type === 'registration' ? '👤' : activity.type === 'appointment' ? '📅' : '👨‍⚕️'}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600, color: 'white' }}>{activity.text}</div>
                                                <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>{activity.time}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Add Modal */}
            {
                showAddModal && (
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
                    }} onClick={() => setShowAddModal(false)}>
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
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>
                                Add New {modalType === 'doctor' ? 'Doctor' : 'Patient'}
                            </h3>
                            <form>
                                <div className="form-group">
                                    <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Full Name</label>
                                    <input type="text" className="input-field" placeholder="Enter full name" style={{ background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Email Address</label>
                                    <input type="email" className="input-field" placeholder="email@example.com" style={{ background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }} required />
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                    <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setShowAddModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn-primary" style={{ flex: 1, background: 'var(--coral-600)' }}>
                                        Add User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default AdminDashboard;
