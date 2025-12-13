import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        role: 'Patient',
        dateOfBirth: '1990-05-15',
        address: '123 Healthcare Ave, Medical City, MC 12345',
        bloodGroup: 'O+',
        emergencyContact: '+1 (555) 987-6543'
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsEditing(false);
        // Add save logic here
    };

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

                {/* Profile Header Card */}
                <div className="glass-effect animate-fadeInDown" style={{
                    padding: '3rem',
                    borderRadius: '24px',
                    marginBottom: '2rem',
                    background: 'rgba(30, 41, 59, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3rem',
                    flexWrap: 'wrap'
                }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--primary-500), var(--purple-500))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '4rem',
                            color: 'white',
                            fontWeight: 700,
                            boxShadow: '0 0 40px rgba(59, 130, 246, 0.4)',
                            border: '4px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            {profile.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <button style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            background: 'var(--accent-500)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'white',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                        }}>📷</button>
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem', lineHeight: 1 }}>
                                    {profile.name}
                                </h1>
                                <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1.2rem', marginBottom: '1rem' }}>{profile.email}</p>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <span style={{
                                        background: 'rgba(59, 130, 246, 0.2)',
                                        color: '#60a5fa',
                                        padding: '0.25rem 1rem',
                                        borderRadius: '20px',
                                        fontWeight: 600,
                                        border: '1px solid rgba(59, 130, 246, 0.3)'
                                    }}>
                                        {profile.role}
                                    </span>
                                    <span style={{
                                        background: 'rgba(16, 185, 129, 0.2)',
                                        color: '#34d399',
                                        padding: '0.25rem 1rem',
                                        borderRadius: '20px',
                                        fontWeight: 600,
                                        border: '1px solid rgba(16, 185, 129, 0.3)'
                                    }}>
                                        Active
                                    </span>
                                </div>
                            </div>
                            <button
                                className={isEditing ? 'btn-secondary' : 'btn-primary'}
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                {isEditing ? <>💾 Save Changes</> : <>✏️ Edit Profile</>}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>

                    {/* Personal Info */}
                    <div className="glass-effect animate-fadeInUp stagger-1" style={{ padding: '2.5rem', borderRadius: '24px', background: 'rgba(30, 41, 59, 0.4)' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                            <span>👤</span> Personal Information
                        </h2>

                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div className="form-group">
                                <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Full Name</label>
                                <input type="text" name="name" className="input-field" value={profile.name} onChange={handleChange} disabled={!isEditing} />
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Email Address</label>
                                <input type="email" name="email" className="input-field" value={profile.email} onChange={handleChange} disabled={!isEditing} />
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Phone Number</label>
                                <input type="tel" name="phone" className="input-field" value={profile.phone} onChange={handleChange} disabled={!isEditing} />
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Date of Birth</label>
                                <input type="date" name="dateOfBirth" className="input-field" value={profile.dateOfBirth} onChange={handleChange} disabled={!isEditing} />
                            </div>
                        </div>
                    </div>

                    {/* Medical Info */}
                    <div className="glass-effect animate-fadeInUp stagger-2" style={{ padding: '2.5rem', borderRadius: '24px', background: 'rgba(30, 41, 59, 0.4)' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                            <span>🩺</span> Medical Information
                        </h2>

                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div className="form-group">
                                <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Blood Group</label>
                                <select
                                    name="bloodGroup"
                                    className="input-field"
                                    value={profile.bloodGroup}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    style={{ appearance: 'none' }}
                                >
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Address</label>
                                <textarea name="address" className="input-field" rows={3} value={profile.address} onChange={handleChange} disabled={!isEditing} style={{ resize: 'none' }} />
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Emergency Contact</label>
                                <input type="tel" name="emergencyContact" className="input-field" value={profile.emergencyContact} onChange={handleChange} disabled={!isEditing} />
                            </div>

                            {!isEditing && (
                                <div style={{
                                    marginTop: '1rem',
                                    padding: '1rem',
                                    background: 'rgba(245, 158, 11, 0.1)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(245, 158, 11, 0.2)',
                                    display: 'flex',
                                    gap: '1rem',
                                    alignItems: 'center'
                                }}>
                                    <span style={{ fontSize: '1.5rem' }}>🔒</span>
                                    <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                                        Some information is read-only. Contact support to update critical medical records.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
