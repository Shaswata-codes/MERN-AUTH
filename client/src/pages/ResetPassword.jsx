import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const inputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.join('').length !== 6) {
      setError('Please enter the complete OTP');
      return;
    }
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); setStep(2); }, 1000);
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    setError('');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (passwords.newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); setStep(3); }, 1500);
  };

  const getPasswordStrength = () => {
    const p = passwords.newPassword;
    if (!p) return { strength: 0, label: '', color: '' };
    let s = 0;
    if (p.length >= 8) s++;
    if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++;
    if (/\d/.test(p)) s++;
    if (/[^a-zA-Z0-9]/.test(p)) s++;
    const levels = [
      { strength: 1, label: 'Weak', color: '#fb7185' },
      { strength: 2, label: 'Fair', color: '#f59e0b' },
      { strength: 3, label: 'Good', color: '#60a5fa' },
      { strength: 4, label: 'Strong', color: '#34d399' }
    ];
    return levels[s - 1] || { strength: 0, label: '', color: '' };
  };

  if (step === 3) {
    return (
      <div className="landing-hero">
        <div className="bg-orb"></div>
        <div className="container-custom" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-effect animate-fadeIn" style={{ maxWidth: '500px', width: '100%', padding: '3rem', textAlign: 'center', borderRadius: '24px' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-400), var(--accent-600))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 0 30px rgba(52, 211, 153, 0.4)' }}>
              <span style={{ fontSize: '3rem' }}>✓</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: 'white' }}>Password Reset! 🎉</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>Your password has been successfully reset.</p>
            <button className="btn-primary" onClick={() => navigate('/login')} style={{ width: '100%' }}>Back to Login</button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    const ps = getPasswordStrength();
    return (
      <div className="landing-hero">
        <div className="bg-orb"></div>
        <div className="container-custom" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-effect animate-fadeIn" style={{ maxWidth: '500px', width: '100%', padding: '3rem', borderRadius: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-500), var(--purple-500))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem', boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)' }}>🔐</div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'white' }}>Create New Password</h1>
            </div>
            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>New Password</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPassword ? 'text' : 'password'} name="newPassword" className="input-field" placeholder="Enter new password" value={passwords.newPassword} onChange={handlePasswordChange} style={{ background: 'rgba(30, 41, 59, 0.8)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)' }} required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>{showPassword ? '🙈' : '👁️'}</button>
                </div>
                {passwords.newPassword && (
                  <div style={{ marginTop: '0.8rem' }}>
                    <div style={{ display: 'flex', gap: '4px', height: '4px', borderRadius: '4px', overflow: 'hidden', background: 'rgba(255,255,255,0.1)' }}>
                      {[1, 2, 3, 4].map(l => (
                        <div key={l} style={{ flex: 1, background: ps.strength >= l ? ps.color : 'transparent', transition: 'all 0.3s ease' }} />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: ps.color, marginTop: '0.5rem', display: 'block', fontWeight: 500 }}>{ps.label}</span>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label className="form-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Confirm Password</label>
                <input type={showPassword ? 'text' : 'password'} name="confirmPassword" className="input-field" placeholder="Confirm password" value={passwords.confirmPassword} onChange={handlePasswordChange} style={{ background: 'rgba(30, 41, 59, 0.8)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)' }} required />
              </div>
              {error && <p style={{ color: '#fb7185', textAlign: 'center', marginBottom: '1rem', background: 'rgba(251, 113, 133, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>{error}</p>}
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={isLoading}>{isLoading ? 'Resetting...' : 'Reset Password'}</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-hero">
      <div className="bg-orb"></div>
      <div className="container-custom" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-effect animate-fadeIn" style={{ maxWidth: '500px', width: '100%', padding: '3rem', borderRadius: '24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-500), var(--purple-500))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem', boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)' }}>🔑</div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Verify Reset Code</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>Enter the 6-digit code sent to your email</p>
          </div>
          <form onSubmit={handleVerifyOtp}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              {otp.map((digit, i) => (
                <input key={i} ref={el => inputRefs.current[i] = el} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={e => handleOtpChange(i, e.target.value.replace(/\D/g, ''))} onKeyDown={e => handleKeyDown(i, e)} style={{ width: '55px', height: '65px', borderRadius: '16px', border: '2px solid rgba(255,255,255,0.1)', fontSize: '1.75rem', fontWeight: 700, textAlign: 'center', background: digit ? 'rgba(59, 130, 246, 0.1)' : 'rgba(30, 41, 59, 0.6)', color: 'white', outline: 'none', transition: 'all 0.3s ease' }} onFocus={e => { e.target.style.borderColor = 'var(--primary-500)'; e.target.style.transform = 'translateY(-2px)'; }} onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.transform = 'translateY(0)'; }} />
              ))}
            </div>
            {error && <p style={{ color: '#fb7185', textAlign: 'center', marginBottom: '1rem', background: 'rgba(251, 113, 133, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>{error}</p>}
            <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={isLoading}>{isLoading ? 'Verifying...' : 'Verify Code'}</button>
          </form>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <span onClick={() => navigate('/forgot-password')} style={{ color: 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.9rem' }} onMouseOver={e => e.target.style.color = 'white'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>← Back to Forgot Password</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
