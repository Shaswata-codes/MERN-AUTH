import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
    const navigate = useNavigate();

    const team = [
        { name: 'Dr. Sarah Johnson', role: 'Chief Medical Officer', emoji: '👩‍⚕️' },
        { name: 'Mark Williams', role: 'CEO & Founder', emoji: '👨‍💼' },
        { name: 'Dr. James Chen', role: 'Head of Cardiology', emoji: '👨‍⚕️' },
        { name: 'Emily Davis', role: 'Tech Director', emoji: '👩‍💻' }
    ];

    const stats = [
        { number: '50K+', label: 'Patients Served' },
        { number: '500+', label: 'Expert Doctors' },
        { number: '98%', label: 'Satisfaction Rate' },
        { number: '24/7', label: 'Support Available' }
    ];

    return (
        <div className="landing-hero">
            <div className="bg-orb"></div>
            <nav className="navbar" style={{ background: 'transparent' }}>
                <div className="container-custom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                        <span style={{ fontSize: '2rem' }}>🏥</span>
                        HealthCare Portal
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn-primary" onClick={() => navigate('/login')}>Sign In</button>
                        <button className="btn-secondary" onClick={() => navigate('/register')}>Register</button>
                    </div>
                </div>
            </nav>

            <div className="container-custom" style={{ padding: '4rem 1.5rem', position: 'relative', zIndex: 1 }}>
                {/* Hero */}
                <div className="animate-fadeIn" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: 'white', marginBottom: '1rem' }}>
                        About HealthCare Portal
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                        Revolutionizing healthcare management through technology, connecting patients with world-class doctors seamlessly.
                    </p>
                </div>

                {/* Stats */}
                <div className="animate-fadeIn" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                    {stats.map((stat, i) => (
                        <div key={i} className="glass-effect" style={{ padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', marginBottom: '0.5rem' }}>{stat.number}</div>
                            <div style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Mission */}
                <div className="glass-effect animate-fadeIn" style={{ padding: '3rem', marginBottom: '4rem', textAlign: 'center', borderRadius: '24px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>Our Mission</h2>
                    <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.8)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.8 }}>
                        We believe that everyone deserves access to quality healthcare. Our platform bridges the gap between patients and healthcare providers, making medical consultations, appointment booking, and health record management effortless and secure.
                    </p>
                </div>

                {/* Team */}
                <div className="animate-fadeIn" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', textAlign: 'center', marginBottom: '2rem' }}>Meet Our Team</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                        {team.map((member, i) => (
                            <div key={i} className="glass-effect hover-lift" style={{ padding: '2rem', textAlign: 'center', borderRadius: '24px' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-400), var(--accent-400))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2.5rem', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                                    {member.emoji}
                                </div>
                                <h3 style={{ fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>{member.name}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Values */}
                <div className="animate-fadeIn" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', textAlign: 'center', marginBottom: '2rem' }}>Our Values</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { icon: '❤️', title: 'Patient First', desc: 'Every decision we make prioritizes patient well-being and satisfaction.' },
                            { icon: '🔒', title: 'Privacy & Security', desc: 'Your health data is protected with enterprise-grade security measures.' },
                            { icon: '🚀', title: 'Innovation', desc: 'Constantly improving our platform with cutting-edge technology.' },
                            { icon: '🤝', title: 'Trust', desc: 'Building lasting relationships through transparency and reliability.' }
                        ].map((value, i) => (
                            <div key={i} className="glass-effect" style={{ padding: '2rem', borderRadius: '16px' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{value.icon}</div>
                                <h3 style={{ fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>{value.title}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="glass-effect animate-fadeIn" style={{ padding: '3rem', borderRadius: '24px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
                        Ready to Experience Better Healthcare?
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '2rem' }}>
                        Join thousands of satisfied patients and doctors on our platform.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn-primary" onClick={() => navigate('/register')}>Get Started</button>
                        <button className="btn-secondary" onClick={() => navigate('/contact')}>Contact Us</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
