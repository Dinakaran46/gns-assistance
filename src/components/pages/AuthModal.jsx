import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, authMode, setAuthMode, login } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (authMode === 'login') {
      if (!email || !password) {
        setErrorMsg('Please enter email and password.');
        return;
      }
      // Demo logic
      if (email.includes('admin')) {
        login({ id: 'adm-1', name: 'Admin Officer', email, role: 'admin' });
      } else {
        login({ id: 'usr-1', name: fullName || 'Ramesh Kumar', email, role: 'user' });
      }
    } else {
      if (!fullName || !email || !password) {
        setErrorMsg('Please complete all required fields.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
      if (!termsAgreed) {
        setErrorMsg('Please accept Terms & Conditions.');
        return;
      }
      login({ id: `usr-${Date.now()}`, name: fullName, email, role: 'user' });
    }
  };

  const fillDemoCitizen = () => {
    setEmail('ramesh.kumar@example.com');
    setPassword('password123');
    setFullName('Ramesh Kumar');
  };

  const fillDemoAdmin = () => {
    setEmail('admin.welfare@gov.in');
    setPassword('adminPass123');
    setFullName('Welfare Admin Officer');
  };

  return (
    <div className="modal-overlay" onClick={() => setAuthModalOpen(false)}>
      <div className="modal-content auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="auth-tab-switch">
            <button 
              className={`auth-tab ${authMode === 'login' ? 'active' : ''}`}
              onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
            >
              Sign In
            </button>
            <button 
              className={`auth-tab ${authMode === 'register' ? 'active' : ''}`}
              onClick={() => { setAuthMode('register'); setErrorMsg(''); }}
            >
              Create Account
            </button>
          </div>
          <button className="btn-ghost" onClick={() => setAuthModalOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {errorMsg && (
            <div className="alert-error">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {authMode === 'register' && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-icon-wrapper">
                  <User size={18} className="input-icon" />
                  <input 
                    type="text" 
                    className="form-input with-icon" 
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email or Mobile Number</label>
              <div className="input-icon-wrapper">
                <Mail size={18} className="input-icon" />
                <input 
                  type="text" 
                  className="form-input with-icon" 
                  placeholder="name@example.com or 9876543210"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {authMode === 'register' && (
              <div className="form-group">
                <label className="form-label">Mobile Phone</label>
                <div className="input-icon-wrapper">
                  <Phone size={18} className="input-icon" />
                  <input 
                    type="tel" 
                    className="form-input with-icon" 
                    placeholder="+91 10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-icon-wrapper">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  className="form-input with-icon" 
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {authMode === 'register' && (
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="input-icon-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type="password" 
                    className="form-input with-icon" 
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            )}

            {authMode === 'login' ? (
              <div className="auth-options-row">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)} 
                  />
                  <span>Remember me</span>
                </label>
                <button type="button" className="forgot-link">Forgot password?</button>
              </div>
            ) : (
              <div className="auth-options-row">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={termsAgreed} 
                    onChange={(e) => setTermsAgreed(e.target.checked)} 
                  />
                  <span>I agree to Terms of Service & Privacy Policy</span>
                </label>
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-lg full-width">
              {authMode === 'login' ? 'Sign In to GNS Assistance' : 'Create Free Account'}
            </button>
          </form>

          {/* Quick Demo Logins Helper */}
          <div className="demo-presets-box">
            <span className="demo-presets-title">Quick Demo One-Click Sign In:</span>
            <div className="demo-btn-row">
              <button className="btn btn-outline btn-sm" onClick={fillDemoCitizen}>
                <User size={14} /> Citizen Login
              </button>
              <button className="btn btn-outline btn-sm" onClick={fillDemoAdmin}>
                <ShieldCheck size={14} /> Admin Login
              </button>
            </div>
          </div>
        </div>

        <style>{`
          .auth-modal-content {
            max-width: 460px;
          }

          .auth-tab-switch {
            display: flex;
            gap: 1rem;
          }

          .auth-tab {
            font-family: 'Outfit', sans-serif;
            font-weight: 700;
            font-size: 1.1rem;
            color: var(--text-secondary);
            padding-bottom: 0.25rem;
            border-bottom: 2px solid transparent;
            transition: var(--transition);
          }

          .auth-tab.active {
            color: var(--primary);
            border-bottom-color: var(--primary);
          }

          .alert-error {
            background-color: var(--error-bg);
            color: var(--error);
            padding: 0.75rem 1rem;
            border-radius: var(--radius-md);
            font-size: 0.85rem;
            margin-bottom: 1.25rem;
          }

          .input-icon-wrapper {
            position: relative;
          }

          .input-icon {
            position: absolute;
            left: 0.85rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-secondary);
          }

          .form-input.with-icon {
            padding-left: 2.5rem;
          }

          .auth-options-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.5rem;
            font-size: 0.85rem;
          }

          .checkbox-label {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            cursor: pointer;
            color: var(--text-secondary);
          }

          .forgot-link {
            color: var(--primary);
            font-weight: 600;
          }

          .full-width {
            width: 100%;
          }

          .demo-presets-box {
            margin-top: 1.75rem;
            padding-top: 1.25rem;
            border-top: 1px solid var(--border);
            text-align: center;
          }

          .demo-presets-title {
            display: block;
            font-size: 0.775rem;
            color: var(--text-secondary);
            margin-bottom: 0.65rem;
            font-weight: 600;
          }

          .demo-btn-row {
            display: flex;
            justify-content: center;
            gap: 0.65rem;
          }
        `}</style>
      </div>
    </div>
  );
}
