import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    const { setIsLoggedin, getUserData, backendUrl } = useContext(AppContext);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        role: 'patient',
        specialization: '',
        licenseNumber: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setIsLoading(true);
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/register', {
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                role: formData.role,
                specialization: formData.specialization,
                licenseNumber: formData.licenseNumber
            });

            if (data.success) {
                setIsLoggedin(true);
                getUserData();
                toast.success("Account created successfully!");
                // Use role from response if available, fallback to form role
                const userRole = data.role || formData.role;
                navigate(`/${userRole}-dashboard`);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="landing-hero">
            <div className="bg-orb"></div>

            <div className="container-custom" style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem 1rem'
            }}>
                <div className="animate-fadeInUp" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '4rem',
                    maxWidth: '1200px',
                    width: '100%',
                    alignItems: 'start'
                }}>
                    {/* Branding Side - Sticky */}
                    <div style={{ position: 'sticky', top: '2rem', display: 'none' }} className="hide-mobile">
                        <div onClick={() => navigate('/')} style={{ cursor: 'pointer', marginBottom: '2rem' }}>
                            <span className="navbar-brand">
                                <span style={{ marginRight: '0.5rem' }}>🏥</span>
                                HealthCare Portal
                            </span>
                        </div>
                        <span className="badge badge-purple" style={{ marginBottom: '1.5rem' }}>
                            ✨ Join 50,000+ Users
                        </span>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                            Begin Your <br />
                            <span className="gradient-text">Health Journey</span>
                        </h1>
                        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.25rem', marginBottom: '3rem', lineHeight: 1.6 }}>
                            Create your account to access personalized healthcare, book appointments, and manage your medical records securely.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                { icon: '⚡', title: 'Instant Access', desc: 'Get verified and start booking instantly' },
                                { icon: '🔒', title: 'Secure Data', desc: 'Your medical records are encrypted and safe' },
                                { icon: '📱', title: 'Mobile Ready', desc: 'Access your health data on any device' }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '16px' }}>
                                    <div style={{ fontSize: '1.5rem' }}>{item.icon}</div>
                                    <div>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'white' }}>{item.title}</h3>
                                        <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.5)' }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Registration Form */}
                    <div className="glass-effect" style={{
                        padding: '3rem',
                        borderRadius: '28px'
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>
                                Create Account
                            </h2>
                            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                Fill in your details to get started
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        className="input-field"
                                        placeholder="John Doe"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        style={{ background: 'rgba(30, 41, 59, 0.8)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="input-field"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={{ background: 'rgba(30, 41, 59, 0.8)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                                        required
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                    <div className="form-group">
                                        <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="input-field"
                                            placeholder="+1 (555) 000-0000"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            style={{ background: 'rgba(30, 41, 59, 0.8)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Role</label>
                                        <select
                                            name="role"
                                            className="form-select"
                                            value={formData.role}
                                            onChange={handleChange}
                                            style={{ background: 'rgba(30, 41, 59, 0.8)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                                            required
                                        >
                                            <option value="patient">🏥 Patient</option>
                                            <option value="doctor">👨‍⚕️ Doctor</option>
                                            <option value="admin">⚙️ Admin</option>
                                        </select>
                                    </div>
                                </div>

                                {formData.role === 'doctor' && (
                                    <div className="animate-fadeIn" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', background: 'rgba(59, 130, 246, 0.1)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                            <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Specialization</label>
                                            <select
                                                name="specialization"
                                                className="form-select"
                                                value={formData.specialization}
                                                onChange={handleChange}
                                                style={{ background: 'rgba(30, 41, 59, 0.8)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                                                required
                                            >
                                                <option value="">Select Specialization</option>
                                                <option value="cardiology">Cardiology</option>
                                                <option value="dermatology">Dermatology</option>
                                                <option value="neurology">Neurology</option>
                                                <option value="orthopedics">Orthopedics</option>
                                                <option value="pediatrics">Pediatrics</option>
                                                <option value="psychiatry">Psychiatry</option>
                                                <option value="general">General Medicine</option>
                                            </select>
                                        </div>

                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                            <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>License Number</label>
                                            <input
                                                type="text"
                                                name="licenseNumber"
                                                className="input-field"
                                                placeholder="LIC-123456"
                                                value={formData.licenseNumber}
                                                onChange={handleChange}
                                                style={{ background: 'rgba(30, 41, 59, 0.8)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                    <div className="form-group">
                                        <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Password</label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                className="input-field"
                                                placeholder="••••••••"
                                                value={formData.password}
                                                onChange={handleChange}
                                                style={{ background: 'rgba(30, 41, 59, 0.8)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', paddingRight: '2.5rem' }}
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                            >
                                                {showPassword ? '🙈' : '👁️'}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Confirm Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            className="input-field"
                                            placeholder="••••••••"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            style={{ background: 'rgba(30, 41, 59, 0.8)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn-primary"
                                style={{ width: '100%', padding: '1.25rem', marginTop: '1rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="spinner"></div>
                                        Creating Account...
                                    </>
                                ) : 'Create Free Account'}
                            </button>
                        </form>

                        <div className="divider"></div>

                        <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)' }}>
                            Already have an account?{' '}
                            <span
                                onClick={() => navigate('/login')}
                                style={{
                                    color: 'var(--primary-400)',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'color 0.3s'
                                }}
                                onMouseOver={(e) => e.target.style.color = 'var(--primary-300)'}
                                onMouseOut={(e) => e.target.style.color = 'var(--primary-400)'}
                            >
                                Sign In
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
