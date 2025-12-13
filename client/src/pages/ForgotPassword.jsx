import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="landing-hero">
                <div className="bg-orb"></div>
                <div className="container-custom" style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div className="glass-effect animate-fadeIn" style={{
                        maxWidth: '500px',
                        width: '100%',
                        padding: '3rem',
                        textAlign: 'center',
                        borderRadius: '24px'
                    }}>
                        <div style={{
                            width: '90px',
                            height: '90px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--accent-400), var(--accent-600))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            fontSize: '2.5rem',
                            boxShadow: '0 0 30px rgba(52, 211, 153, 0.4)'
                        }}>
                            ✓
                        </div>
                        <h1 style={{
                            fontSize: '2rem',
                            fontWeight: 800,
                            marginBottom: '1rem',
                            color: 'white'
                        }}>
                            Check Your Email
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', lineHeight: 1.6 }}>
                            We've sent password reset instructions to <strong>{email}</strong>.
                            Please check your inbox and follow the link to reset your password.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                className="btn-primary"
                                onClick={() => navigate('/login')}
                                style={{ flex: 1 }}
                            >
                                Back to Login
                            </button>
                            <button
                                className="btn-secondary"
                                onClick={() => setSubmitted(false)}
                                style={{ flex: 1 }}
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="landing-hero">
            <div className="bg-orb"></div>
            <div className="container-custom" style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="glass-effect animate-fadeIn" style={{
                    maxWidth: '500px',
                    width: '100%',
                    padding: '3rem',
                    borderRadius: '24px'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--primary-500), var(--purple-500))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            fontSize: '2.5rem',
                            boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)'
                        }}>
                            🔐
                        </div>
                        <h1 style={{
                            fontSize: '2rem',
                            fontWeight: 800,
                            marginBottom: '0.5rem',
                            color: 'white'
                        }}>
                            Forgot Password?
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                            Enter your email and we'll send you instructions to reset your password.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="input-field"
                                placeholder="your.email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ background: 'rgba(30, 41, 59, 0.8)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-primary"
                            style={{ width: '100%', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
                                    Sending...
                                </>
                            ) : 'Send Reset Instructions'}
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <span
                            onClick={() => navigate('/login')}
                            style={{
                                color: 'rgba(255,255,255,0.6)',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => e.target.style.color = 'white'}
                            onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}
                        >
                            ← Back to Login
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
