import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmailVerify = () => {
  const navigate = useNavigate();
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContext);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (isLoggedin && userData && userData.isAccountVerified) {
      navigate('/');
    }
  }, [isLoggedin, userData, navigate]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (index, value) => {
    if (value.length > 1) return; // Only allow single character
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);
    const nextEmpty = newOtp.findIndex(digit => !digit);
    if (nextEmpty !== -1) {
      inputRefs.current[nextEmpty]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      setError('Please enter the complete OTP');
      return;
    }

    setIsLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/verifyAccount', { otp: otpCode });

      if (data.success) {
        setIsVerified(true);
        getUserData();
        toast.success(data.message);
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;

    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/sendVerifyOtp');
      if (data.success) {
        toast.success(data.message);
        setResendCooldown(60);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isVerified) {
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
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-400) 0%, var(--accent-600) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem',
              animation: 'pulse 2s ease-in-out infinite',
              boxShadow: '0 0 30px rgba(52, 211, 153, 0.4)'
            }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 800,
              marginBottom: '1rem',
              color: 'white'
            }}>
              Email Verified! 🎉
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Your email has been successfully verified. You now have full access to all features.
            </p>
            <button
              className="btn-primary"
              onClick={() => navigate('/patient-dashboard')}
              style={{ width: '100%' }}
            >
              Go to Dashboard
            </button>
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
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)'
            }}>
              <span style={{ fontSize: '2.5rem' }}>✉️</span>
            </div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 800,
              marginBottom: '0.5rem',
              color: 'white'
            }}>
              Check Your Email
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              We've sent a 6-digit verification code to your email address. Enter it below to verify your account.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '2rem'
            }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ''))}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  style={{
                    width: '55px',
                    height: '65px',
                    borderRadius: '16px',
                    border: error ? '2px solid var(--error)' : '2px solid rgba(255,255,255,0.1)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    background: digit ? 'rgba(59, 130, 246, 0.1)' : 'rgba(30, 41, 59, 0.6)',
                    color: 'white'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary-500)';
                    e.target.style.background = 'rgba(59, 130, 246, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = error ? 'var(--error)' : 'rgba(255,255,255,0.1)';
                    e.target.style.background = digit ? 'rgba(59, 130, 246, 0.1)' : 'rgba(30, 41, 59, 0.6)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              ))}
            </div>

            {error && (
              <p style={{
                color: 'var(--coral-500)',
                textAlign: 'center',
                marginBottom: '1rem',
                fontSize: '0.9rem',
                fontWeight: 500,
                background: 'rgba(239, 68, 68, 0.1)',
                padding: '0.5rem',
                borderRadius: '8px'
              }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="btn-primary"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '1rem',
                fontSize: '1.1rem'
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
                  Verifying...
                </>
              ) : (
                'Verify Email'
              )}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>
              Didn't receive the code?
            </p>
            <button
              onClick={handleResend}
              disabled={resendCooldown > 0}
              style={{
                background: 'none',
                border: 'none',
                color: resendCooldown > 0 ? 'rgba(255,255,255,0.4)' : 'var(--primary-400)',
                fontWeight: 600,
                cursor: resendCooldown > 0 ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
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

export default EmailVerify;
