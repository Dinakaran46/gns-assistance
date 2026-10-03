import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Globe, 
  Bell, 
  CheckCircle2, 
  Sparkles,
  Save
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import DisclaimerBanner from '../common/DisclaimerBanner';

export default function UserProfile() {
  const { userProfile, setUserProfile } = useApp();
  const { lang, setLang, t } = useLanguage();

  const [formData, setFormData] = useState({ ...userProfile });
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateCompletion = () => {
    const fields = ['fullName', 'email', 'phone', 'age', 'annualIncome', 'occupation', 'state', 'district', 'category', 'educationLevel'];
    let filled = 0;
    fields.forEach(f => {
      if (formData[f] !== undefined && formData[f] !== null && formData[f] !== '') filled++;
    });
    return Math.round((filled / fields.length) * 100);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const completion = calculateCompletion();
    const updated = {
      ...formData,
      completionPercentage: completion
    };
    setUserProfile(updated);
    setSuccessMsg('Profile updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const completionPercent = calculateCompletion();

  return (
    <div className="user-profile-page">
      <DisclaimerBanner />

      <div className="profile-header-card card">
        <div className="profile-hero-left">
          <div className="big-avatar-circle">
            {formData.fullName ? formData.fullName[0].toUpperCase() : 'U'}
          </div>
          <div>
            <h1>{formData.fullName || 'Citizen Profile'}</h1>
            <p className="user-email-text">{formData.email}</p>
            <span className="badge badge-blue">{formData.occupation || 'Student'} • {formData.state || 'India'}</span>
          </div>
        </div>

        {/* Circular Profile Completion Ring */}
        <div className="profile-completion-ring-box">
          <div className="ring-graphic">
            <svg width="76" height="76">
              <circle className="ring-bg" cx="38" cy="38" r="32" />
              <circle 
                className="ring-progress" 
                cx="38" 
                cy="38" 
                r="32" 
                strokeDasharray="201" 
                strokeDashoffset={201 - (201 * completionPercent) / 100}
              />
            </svg>
            <span className="ring-percent-text">{completionPercent}%</span>
          </div>
          <div className="ring-label">Profile Completion</div>
        </div>
      </div>

      {successMsg && (
        <div className="alert-success">
          <CheckCircle2 size={18} /> {successMsg}
        </div>
      )}

      {/* Edit Form */}
      <form onSubmit={handleSave} className="profile-form-card card">
        <h2>Personal & Demographic Information</h2>
        
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={formData.fullName || ''}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <input 
              type="tel" 
              className="form-input" 
              value={formData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Age (Years)</label>
            <input 
              type="number" 
              className="form-input" 
              value={formData.age || ''}
              onChange={(e) => handleChange('age', Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Annual Family Income (₹)</label>
            <input 
              type="number" 
              className="form-input" 
              value={formData.annualIncome || ''}
              onChange={(e) => handleChange('annualIncome', Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Occupation</label>
            <select 
              className="form-select"
              value={formData.occupation || 'Student'}
              onChange={(e) => handleChange('occupation', e.target.value)}
            >
              <option value="Student">Student</option>
              <option value="Farmer">Farmer</option>
              <option value="Entrepreneur">Entrepreneur</option>
              <option value="Self Employed">Self Employed</option>
              <option value="Job Seeker">Job Seeker</option>
              <option value="Salaried Private">Salaried Private</option>
              <option value="Senior Citizen">Senior Citizen</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">State / UT of Domicile</label>
            <select 
              className="form-select"
              value={formData.state || 'Tamil Nadu'}
              onChange={(e) => handleChange('state', e.target.value)}
            >
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Delhi">Delhi</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">District</label>
            <input 
              type="text" 
              className="form-input" 
              value={formData.district || ''}
              onChange={(e) => handleChange('district', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Social Category</label>
            <select 
              className="form-select"
              value={formData.category || 'General'}
              onChange={(e) => handleChange('category', e.target.value)}
            >
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EWS">EWS</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Education Level</label>
            <select 
              className="form-select"
              value={formData.educationLevel || 'Undergraduate'}
              onChange={(e) => handleChange('educationLevel', e.target.value)}
            >
              <option value="Class 8 Pass">Class 8 Pass</option>
              <option value="Class 10 Pass">Class 10 Pass</option>
              <option value="Class 12 Pass">Class 12 Pass</option>
              <option value="Undergraduate">Undergraduate Student / Degree</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>
        </div>

        {/* System Preferences */}
        <h2 style={{ marginTop: '2rem' }}>Platform Preferences</h2>
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Preferred Interface Language</label>
            <select className="form-select" value={lang} onChange={(e) => setLang(e.target.value)}>
              <option value="en">English</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="hi">हिन्दी (Hindi)</option>
            </select>
          </div>
        </div>

        <div className="profile-form-actions">
          <button type="submit" className="btn btn-primary btn-lg">
            <Save size={18} /> Save Changes
          </button>
        </div>
      </form>

      <style>{`
        .user-profile-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .profile-header-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .profile-hero-left {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .big-avatar-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: #ffffff;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-hero-left h1 {
          font-size: 1.5rem;
          margin-bottom: 2px;
        }

        .user-email-text {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .profile-completion-ring-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }

        .ring-graphic {
          position: relative;
          width: 76px;
          height: 76px;
        }

        .ring-bg {
          fill: none;
          stroke: var(--border);
          stroke-width: 6;
        }

        .ring-progress {
          fill: none;
          stroke: var(--primary);
          stroke-width: 6;
          stroke-linecap: round;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
          transition: stroke-dashoffset 0.5s ease;
        }

        .ring-percent-text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--text-main);
        }

        .ring-label {
          font-size: 0.775rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .alert-success {
          background-color: var(--success-bg);
          color: var(--success);
          padding: 0.85rem 1.1rem;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }

        .profile-form-card h2 {
          font-size: 1.2rem;
          margin-bottom: 1.25rem;
        }

        .profile-form-actions {
          margin-top: 2rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
}
