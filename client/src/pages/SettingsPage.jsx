import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('account');
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        appointmentReminders: true,
        promotionalEmails: false,
        twoFactorAuth: false,
        darkMode: true,
        language: 'en'
    });
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const handleToggle = (key) => {
        setSettings({ ...settings, [key]: !settings[key] });
    };

    const tabs = [
        { id: 'account', label: 'Account', icon: '👤' },
        { id: 'notifications', label: 'Notifications', icon: '🔔' },
        { id: 'security', label: 'Security', icon: '🔒' },
        { id: 'preferences', label: 'Preferences', icon: '⚙️' }
    ];

    const Toggle = ({ checked, onChange }) => (
        <div onClick={onChange} style={{ width: '50px', height: '26px', borderRadius: '13px', background: checked ? 'var(--primary-500)' : 'rgba(255,255,255,0.2)', cursor: 'pointer', position: 'relative', transition: 'all 0.3s ease' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', left: checked ? '26px' : '2px', transition: 'all 0.3s ease', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
        </div>
    );

    return (
        <div className="landing-hero">
            <div className="bg-orb"></div>

            {/* Navbar */}
            <nav className="glass-effect" style={{ padding: '1rem 2rem', position: 'fixed', width: '100%', top: 0, zIndex: 100 }}>
                <div className="container-custom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', color: 'white' }}>
                        <span>🏥</span>
                        <span className="gradient-text">HealthPortal</span>
                    </div>
                    <button
                        className="btn-outline"
                        onClick={() => navigate(-1)}
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <span>←</span> Back to Dashboard
                    </button>
                </div>
            </nav>

            <div className="container-custom" style={{ paddingTop: '100px', paddingBottom: '2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '2rem' }}>Settings</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
                    {/* Sidebar */}
                    <div className="glass-effect" style={{ padding: '1rem', height: 'fit-content', borderRadius: '20px', background: 'rgba(30, 41, 59, 0.4)' }}>
                        {tabs.map(tab => (
                            <div
                                key={tab.id}
                                className={`sidebar-item`}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: '0.875rem 1rem',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '0.5rem',
                                    color: activeTab === tab.id ? 'white' : 'rgba(255, 255, 255, 0.6)',
                                    background: activeTab === tab.id ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.2), transparent)' : 'transparent',
                                    borderLeft: activeTab === tab.id ? '3px solid var(--primary-500)' : '3px solid transparent',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <span style={{ fontSize: '1.25rem' }}>{tab.icon}</span>
                                <span style={{ fontWeight: 500 }}>{tab.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="glass-effect animate-fadeIn" style={{ padding: '2.5rem', borderRadius: '24px', background: 'rgba(30, 41, 59, 0.6)' }}>
                        {activeTab === 'account' && (
                            <>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Account Settings</h2>
                                <div className="form-group">
                                    <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Email Address</label>
                                    <input type="email" className="input-field" defaultValue="john.doe@example.com" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Username</label>
                                    <input type="text" className="input-field" defaultValue="johndoe" />
                                </div>
                                <button className="btn-primary">Save Changes</button>
                                <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)' }} />
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--error)', marginBottom: '1rem' }}>Danger Zone</h3>
                                <button style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.4)', cursor: 'pointer' }}>Delete Account</button>
                            </>
                        )}

                        {activeTab === 'notifications' && (
                            <>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Notification Preferences</h2>
                                {[
                                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                                    { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive notifications via SMS' },
                                    { key: 'appointmentReminders', label: 'Appointment Reminders', desc: 'Get reminded before appointments' },
                                    { key: 'promotionalEmails', label: 'Promotional Emails', desc: 'Receive offers and updates' }
                                ].map(item => (
                                    <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div>
                                            <p style={{ fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>{item.label}</p>
                                            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>{item.desc}</p>
                                        </div>
                                        <Toggle checked={settings[item.key]} onChange={() => handleToggle(item.key)} />
                                    </div>
                                ))}
                            </>
                        )}

                        {activeTab === 'security' && (
                            <>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Security Settings</h2>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div>
                                        <p style={{ fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>Password</p>
                                        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>Last changed 30 days ago</p>
                                    </div>
                                    <button className="btn-primary" onClick={() => setShowPasswordModal(true)}>Change Password</button>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div>
                                        <p style={{ fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>Two-Factor Authentication</p>
                                        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>Add an extra layer of security</p>
                                    </div>
                                    <Toggle checked={settings.twoFactorAuth} onChange={() => handleToggle('twoFactorAuth')} />
                                </div>
                            </>
                        )}

                        {activeTab === 'preferences' && (
                            <>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>App Preferences</h2>
                                <div className="form-group">
                                    <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Language</label>
                                    <select
                                        className=" input-field"
                                        value={settings.language}
                                        onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                                        style={{ background: 'rgba(15, 23, 42, 0.6)', color: 'white' }}
                                    >
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="fr">French</option>
                                        <option value="de">German</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
                                    <div>
                                        <p style={{ fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>Dark Mode</p>
                                        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>Use dark theme</p>
                                    </div>
                                    <Toggle checked={settings.darkMode} onChange={() => handleToggle('darkMode')} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Password Modal */}
            {showPasswordModal && (
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
                }} onClick={() => setShowPasswordModal(false)}>
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
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Change Password</h2>
                        <div className="form-group">
                            <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Current Password</label>
                            <input type="password" className="input-field" placeholder="Enter current password" />
                        </div>
                        <div className="form-group">
                            <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>New Password</label>
                            <input type="password" className="input-field" placeholder="Enter new password" />
                        </div>
                        <div className="form-group">
                            <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Confirm Password</label>
                            <input type="password" className="input-field" placeholder="Confirm new password" />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn-primary" style={{ flex: 1 }}>Update Password</button>
                            <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setShowPasswordModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsPage;
