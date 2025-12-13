import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState('patient');

  const features = [
    { icon: '📅', title: 'Easy Appointment Booking', description: 'Book appointments with your preferred doctors in just a few clicks' },
    { icon: '👨‍⚕️', title: 'Expert Doctors', description: 'Access to certified and experienced healthcare professionals' },
    { icon: '📊', title: 'Health Records', description: 'Securely manage and access your medical history anytime' },
    { icon: '🔔', title: 'Smart Reminders', description: 'Never miss an appointment with automated notifications' },
    { icon: '💊', title: 'Prescription Management', description: 'Digital prescriptions for easy access and pharmacy delivery' },
    { icon: '🏥', title: 'Multi-specialty Care', description: 'Connect with specialists across various medical fields' }
  ];

  const roles = [
    { id: 'patient', label: 'Patient', icon: '🏥', description: 'Book appointments and manage health records' },
    { id: 'doctor', label: 'Doctor', icon: '👨‍⚕️', description: 'Manage patients and appointments' },
    { id: 'admin', label: 'Admin', icon: '⚙️', description: 'Oversee the entire healthcare system' }
  ];

  const stats = [
    { number: '50K+', label: 'Patients' },
    { number: '500+', label: 'Doctors' },
    { number: '98%', label: 'Satisfaction' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <div className="landing-hero">
      {/* Background Orb */}
      <div className="bg-orb"></div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="container-custom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="navbar-brand" onClick={() => navigate('/')}>
            <span style={{ marginRight: '0.5rem' }}>🏥</span>
            HealthCare Portal
          </div>
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <span className="nav-link" onClick={() => navigate('/about')}>About</span>
              <span className="nav-link" onClick={() => navigate('/contact')}>Contact</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-outline" onClick={() => navigate('/login')}>Sign In</button>
              <button className="btn-primary" onClick={() => navigate('/register')}>Get Started</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container-custom" style={{ position: 'relative', zIndex: 1, paddingTop: '6rem', paddingBottom: '4rem' }}>
        <div className="animate-fadeInUp" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="badge badge-purple" style={{ padding: '0.5rem 1rem' }}>
              ✨ #1 Healthcare Platform
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            color: 'white',
            marginBottom: '1.5rem',
            lineHeight: 1.1,
            letterSpacing: '-0.02em'
          }}>
            Your Health, <br />
            <span className="gradient-text">Our Priority</span>
          </h1>
          <p style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '650px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7
          }}>
            Experience seamless healthcare management with our comprehensive doctor-patient portal. Connect, consult, and care—all in one place.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => navigate('/register')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Start Free Trial →
            </button>
            <button className="btn-outline" onClick={() => navigate('/about')} style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Learn More
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="animate-fadeInUp stagger-2" style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', marginBottom: '5rem' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '0.25rem' }}>{stat.number}</div>
              <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Role Cards */}
        <div className="animate-fadeInUp stagger-3" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '6rem'
        }}>
          {roles.map((role) => (
            <div
              key={role.id}
              className="feature-card"
              onClick={() => setActiveRole(role.id)}
              style={{
                cursor: 'pointer',
                border: activeRole === role.id ? '2px solid var(--primary-500)' : '1px solid rgba(255, 255, 255, 0.1)',
                transform: activeRole === role.id ? 'scale(1.02)' : 'scale(1)'
              }}
            >
              <div className="icon-container">
                {role.icon}
              </div>
              <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                {role.label}
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.6 }}>
                {role.description}
              </p>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div style={{ marginBottom: '6rem' }}>
          <div className="animate-fadeInUp" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
              Why Choose <span className="gradient-text">Us?</span>
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
              Everything you need for modern healthcare management
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="icon-container">
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-effect animate-fadeInUp" style={{
          padding: '4rem',
          borderRadius: '32px',
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 800,
            color: 'white',
            marginBottom: '1rem'
          }}>
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '2rem',
            maxWidth: '500px',
            margin: '0 auto 2rem'
          }}>
            Join thousands of patients and doctors already using our platform
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => navigate('/register')} style={{ padding: '1rem 2.5rem' }}>
              Create Free Account
            </button>
            <button className="btn-secondary" onClick={() => navigate('/contact')} style={{ padding: '1rem 2.5rem' }}>
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '2rem 0',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container-custom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem' }}>
            © 2025 HealthCare Portal. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <span onClick={() => navigate('/about')} style={{ color: 'rgba(255, 255, 255, 0.5)', cursor: 'pointer', fontSize: '0.875rem' }}>About</span>
            <span onClick={() => navigate('/contact')} style={{ color: 'rgba(255, 255, 255, 0.5)', cursor: 'pointer', fontSize: '0.875rem' }}>Contact</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.5)', cursor: 'pointer', fontSize: '0.875rem' }}>Privacy</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.5)', cursor: 'pointer', fontSize: '0.875rem' }}>Terms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
