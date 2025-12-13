import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="landing-hero">
                <div className="bg-orb"></div>
                <div className="container-custom" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="glass-effect animate-fadeIn" style={{ maxWidth: '500px', width: '100%', padding: '3rem', textAlign: 'center', borderRadius: '24px' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem', background: 'rgba(255,255,255,0.1)', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>✅</div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: 'white' }}>Message Sent!</h1>
                        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                        <button className="btn-primary" onClick={() => navigate('/')} style={{ width: '100%' }}>Back to Home</button>
                    </div>
                </div>
            </div>
        );
    }

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
                    </div>
                </div>
            </nav>

            <div className="container-custom" style={{ padding: '4rem 1.5rem', position: 'relative', zIndex: 1 }}>
                <div className="animate-fadeIn" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'white', marginBottom: '1rem' }}>Get In Touch</h1>
                    <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto' }}>
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                    {/* Contact Form */}
                    <div className="glass-effect animate-fadeIn" style={{ padding: '2.5rem', borderRadius: '24px', background: 'rgba(30, 41, 59, 0.6)' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Send a Message</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Full Name</label>
                                <input type="text" name="name" className="input-field" placeholder="John Doe" value={formData.name} onChange={handleChange} required style={{ background: 'rgba(15, 23, 42, 0.6)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }} />
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Email Address</label>
                                <input type="email" name="email" className="input-field" placeholder="john@example.com" value={formData.email} onChange={handleChange} required style={{ background: 'rgba(15, 23, 42, 0.6)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }} />
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Subject</label>
                                <select
                                    name="subject"
                                    className="input-field"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    style={{ background: 'rgba(15, 23, 42, 0.6)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', appearance: 'none' }}
                                >
                                    <option value="">Select a subject</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="support">Technical Support</option>
                                    <option value="billing">Billing Question</option>
                                    <option value="feedback">Feedback</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Message</label>
                                <textarea name="message" className="input-field" rows={4} placeholder="Your message..." value={formData.message} onChange={handleChange} required style={{ resize: 'none', background: 'rgba(15, 23, 42, 0.6)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }} />
                            </div>
                            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Message</button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="animate-fadeIn">
                        <div className="glass-effect" style={{ padding: '2rem', borderRadius: '16px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📍</div>
                            <div>
                                <h3 style={{ fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>Address</h3>
                                <p style={{ color: 'rgba(255,255,255,0.7)' }}>123 Healthcare Ave, Medical City, MC 12345</p>
                            </div>
                        </div>
                        <div className="glass-effect" style={{ padding: '2rem', borderRadius: '16px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📧</div>
                            <div>
                                <h3 style={{ fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>Email</h3>
                                <p style={{ color: 'rgba(255,255,255,0.7)' }}>support@healthcare-portal.com</p>
                            </div>
                        </div>
                        <div className="glass-effect" style={{ padding: '2rem', borderRadius: '16px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📞</div>
                            <div>
                                <h3 style={{ fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>Phone</h3>
                                <p style={{ color: 'rgba(255,255,255,0.7)' }}>+1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="glass-effect" style={{ padding: '2rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🕐</div>
                            <div>
                                <h3 style={{ fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>Working Hours</h3>
                                <p style={{ color: 'rgba(255,255,255,0.7)' }}>Mon - Fri: 9AM - 6PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
