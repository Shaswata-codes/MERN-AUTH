import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '', role: 'patient' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { setIsLoggedin, getUserData, backendUrl } = useContext(AppContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/login', {
                email: formData.email,
                password: formData.password
            });

            if (data.success) {
                setIsLoggedin(true);
                getUserData();
                navigate(`/${formData.role}-dashboard`);
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
                padding: '2rem'
            }}>
                <div className="animate-fadeInUp" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '4rem',
                    maxWidth: '1000px',
                    width: '100%',
                    alignItems: 'center'
                }}>
                    {/* Left Side - Branding */}
                    <div style={{ display: 'none' }} className="hide-mobile">
                        <div onClick={() => navigate('/')} style={{ cursor: 'pointer', marginBottom: '2rem' }}>
                            <span className="navbar-brand">
                                <span style={{ marginRight: '0.5rem' }}>🏥</span>
                                HealthCare Portal
                            </span>
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
                            Welcome Back to <br />
                            <span className="gradient-text">Your Health Hub</span>
                        </h1>
                        <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1.125rem', marginBottom: '2rem', lineHeight: 1.7 }}>
                            Access your appointments, health records, and connect with healthcare professionals.
                        </p>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            {[
                                { icon: '🔒', text: 'Secure Login' },
                                { icon: '⚡', text: 'Fast Access' },
                                { icon: '🛡️', text: 'HIPAA Compliant' }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                                    <span>{item.icon}</span>
                                    <span style={{ fontSize: '0.875rem' }}>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="glass-effect" style={{
                        padding: '3rem',
                        borderRadius: '28px'
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '20px',
                                background: 'linear-gradient(135deg, var(--primary-500), var(--purple-500))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                fontSize: '2rem',
                                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
                            }}>
                                👋
                            </div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>
                                Sign In
                            </h2>
                            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                Enter your credentials to continue
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Login As</label>
                                <select
                                    name="role"
                                    className="form-select"
                                    value={formData.role}
                                    onChange={handleChange}
                                    style={{ background: 'rgba(30, 41, 59, 0.8)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                                >
                                    <option value="patient">🏥 Patient</option>
                                    <option value="doctor">👨‍⚕️ Doctor</option>
                                    <option value="admin">⚙️ Admin</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input-field"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{ background: 'rgba(30, 41, 59, 0.8)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        className="input-field"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        style={{ background: 'rgba(30, 41, 59, 0.8)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', paddingRight: '3rem' }}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '1rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '1.25rem'
                                        }}
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'rgba(255, 255, 255, 0.6)' }}>
                                    <input type="checkbox" style={{ accentColor: 'var(--primary-500)' }} />
                                    <span style={{ fontSize: '0.875rem' }}>Remember me</span>
                                </label>
                                <span
                                    onClick={() => navigate('/forgot-password')}
                                    style={{ fontSize: '0.875rem', color: 'var(--primary-400)', fontWeight: 600, cursor: 'pointer' }}
                                >
                                    Forgot Password?
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="btn-primary"
                                style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="spinner"></div>
                                        Signing in...
                                    </>
                                ) : 'Sign In'}
                            </button>
                        </form>

                        <div className="divider"></div>

                        <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)' }}>
                            Don't have an account?{' '}
                            <span onClick={() => navigate('/register')} style={{ color: 'var(--primary-400)', fontWeight: 600, cursor: 'pointer' }}>
                                Sign Up
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
