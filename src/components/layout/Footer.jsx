import React from 'react';
import { Landmark, Shield, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Footer() {
  const { setActiveView } = useApp();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <Landmark size={22} className="logo-icon" />
            <span>GNS Assistance</span>
          </div>
          <p className="footer-tagline">
            Empowering citizens with AI-driven personalized welfare discovery, smart eligibility checking, and document guidance.
          </p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h4>Quick Navigation</h4>
            <button onClick={() => setActiveView('discover')}>Discover Schemes</button>
            <button onClick={() => setActiveView('eligibility')}>Eligibility Checker</button>
            <button onClick={() => setActiveView('ai')}>GNS AI Assistant</button>
            <button onClick={() => setActiveView('documents')}>Document Guide</button>
          </div>

          <div className="footer-col">
            <h4>Beneficiary Portals</h4>
            <button onClick={() => setActiveView('discover')}>Student Scholarships</button>
            <button onClick={() => setActiveView('discover')}>Farmer Welfare</button>
            <button onClick={() => setActiveView('discover')}>Women & Child Care</button>
            <button onClick={() => setActiveView('discover')}>Entrepreneur Loans</button>
          </div>

          <div className="footer-col">
            <h4>Compliance & Governance</h4>
            <a href="https://india.gov.in" target="_blank" rel="noreferrer">National Portal of India</a>
            <a href="https://pmkisan.gov.in" target="_blank" rel="noreferrer">PM-KISAN Portal</a>
            <a href="https://scholarships.gov.in" target="_blank" rel="noreferrer">National Scholarship Portal</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="legal-note">
          <Shield size={14} /> GNS Assistance - AI Government Welfare Portal. All rights reserved.
        </div>
        <div className="disclaimer-note">
          Notice: Final scheme eligibility and grant release rest solely with official Government Ministries.
        </div>
      </div>

      <style>{`
        .app-footer {
          background-color: #ffffff;
          border-top: 1px solid var(--border);
          padding: 2.5rem 2rem 1.5rem;
          margin-top: 3rem;
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 3fr;
          gap: 3rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--primary);
        }

        .footer-tagline {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-top: 0.75rem;
          line-height: 1.6;
        }

        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .footer-col h4 {
          font-size: 0.925rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-main);
        }

        .footer-col button, .footer-col a {
          display: block;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 0.6rem;
          transition: var(--transition);
          text-align: left;
        }

        .footer-col button:hover, .footer-col a:hover {
          color: var(--primary);
        }

        .footer-bottom {
          max-width: 1400px;
          margin: 2rem auto 0;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .legal-note {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        @media (max-width: 768px) {
          .footer-content { grid-template-columns: 1fr; gap: 2rem; }
          .footer-links-grid { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
