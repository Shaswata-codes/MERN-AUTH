import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-hero">
            <div className="container-custom" style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                <div className="animate-fadeIn">
                    {/* 404 Animation */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{
                            fontSize: 'clamp(6rem, 15vw, 12rem)',
                            fontWeight: 900,
                            fontFamily: 'Outfit, sans-serif',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            lineHeight: 1,
                            textShadow: '0 20px 40px rgba(0,0,0,0.1)'
                        }}>
                            404
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <div style={{ position: 'relative', marginBottom: '2rem' }}>
                        <div style={{
                            position: 'absolute',
                            top: '-80px',
                            left: '50%',
                            transform: 'translateX(-150px)',
                            fontSize: '3rem',
                            animation: 'float 3s ease-in-out infinite'
                        }}>🏥</div>
                        <div style={{
                            position: 'absolute',
                            top: '-60px',
                            left: '50%',
                            transform: 'translateX(100px)',
                            fontSize: '2.5rem',
                            animation: 'float 4s ease-in-out infinite reverse'
                        }}>💊</div>
                        <div style={{
                            position: 'absolute',
                            top: '-40px',
                            left: '50%',
                            transform: 'translateX(-50px)',
                            fontSize: '2rem',
                            animation: 'float 3.5s ease-in-out infinite'
                        }}>🩺</div>
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                        fontWeight: 800,
                        color: 'white',
                        marginBottom: '1rem'
                    }}>
                        Oops! Page Not Found
                    </h1>
                    <p style={{
                        fontSize: '1.125rem',
                        color: 'rgba(255,255,255,0.8)',
                        maxWidth: '500px',
                        margin: '0 auto 2rem',
                        lineHeight: 1.6
                    }}>
                        The page you're looking for seems to have wandered off. Don't worry, we'll help you find your way back!
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            className="btn-primary"
                            onClick={() => navigate('/')}
                            style={{ fontSize: '1rem', padding: '1rem 2rem' }}
                        >
                            🏠 Go Home
                        </button>
                        <button
                            className="btn-secondary"
                            onClick={() => navigate(-1)}
                            style={{ fontSize: '1rem', padding: '1rem 2rem' }}
                        >
                            ← Go Back
                        </button>
                    </div>

                    {/* Quick Links */}
                    <div style={{ marginTop: '3rem' }}>
                        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
                            Or try these quick links:
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {[
                                { path: '/login', label: 'Login' },
                                { path: '/register', label: 'Register' },
                                { path: '/patient-dashboard', label: 'Dashboard' }
                            ].map(link => (
                                <span
                                    key={link.path}
                                    onClick={() => navigate(link.path)}
                                    style={{
                                        color: 'white',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        padding: '0.5rem 1rem',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                                    onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                                >
                                    {link.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
