import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Search, 
  ShieldCheck, 
  Bot, 
  FileCheck2, 
  Bell, 
  Scale, 
  Users, 
  GraduationCap, 
  Sprout, 
  Briefcase, 
  HeartHandshake, 
  Award,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';

export default function LandingPage() {
  const { setActiveView, setAuthModalOpen, setAuthMode } = useApp();
  const { t } = useLanguage();

  const categories = [
    { title: "Students & Education", icon: GraduationCap, color: "#2563EB", desc: "Scholarships, fee waivers & higher ed grants" },
    { title: "Farmers & Agriculture", icon: Sprout, color: "#16A34A", desc: "PM-KISAN, crop insurance & equipment subsidies" },
    { title: "Entrepreneurs & Business", icon: Briefcase, color: "#0D9488", desc: "Mudra loans, StandUp India & startup grants" },
    { title: "Women & Child Care", icon: HeartHandshake, color: "#D97706", desc: "Sukanya Samriddhi, PMMVY maternity benefits" },
    { title: "Senior Citizens", icon: Award, color: "#9333EA", desc: "Ayushman 70+ healthcare & pension schemes" },
    { title: "Job Seekers & Youth", icon: Users, color: "#DC2626", desc: "NAPS apprenticeship & skill development" }
  ];

  const features = [
    { title: "AI-Powered Recommendations", icon: Bot, desc: "Personalized matching engine mapping your demographic profile to government criteria." },
    { title: "Smart Eligibility Checker", icon: CheckCircle2, desc: "Transparent 3-tier analysis highlighting matched, missing, and unmet requirements." },
    { title: "Multilingual AI Assistant", icon: Sparkles, desc: "Natural language query assistant supporting English, Tamil, and Hindi." },
    { title: "Document Guidance Center", icon: FileCheck2, desc: "Step-by-step instructions and interactive readiness checklist for required documents." },
    { title: "Deadline Reminders", icon: Bell, desc: "Never miss application windows with proactive timeline notifications." },
    { title: "Side-by-Side Scheme Comparison", icon: Scale, desc: "Compare benefits, income caps, and criteria across multiple schemes in a clean matrix." }
  ];

  const steps = [
    { num: "01", title: "Create Your Profile", desc: "Enter basic demographics, annual income, state, and occupation." },
    { num: "02", title: "Check Eligibility", desc: "Run smart evaluation against 20+ verified central and state welfare databases." },
    { num: "03", title: "Discover Relevant Schemes", desc: "Filter by category, benefit type, and government department." },
    { num: "04", title: "Apply with Confidence", desc: "Access official portal links, document checklists, and AI assistance." }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="badge badge-blue hero-badge">
            <Sparkles size={14} /> AI-POWERED CITIZEN WELFARE PLATFORM
          </div>
          <h1 className="hero-title">{t('hero.title')}</h1>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>
          
          <div className="hero-ctas">
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => {
                setAuthMode('register');
                setAuthModalOpen(true);
              }}
            >
              {t('hero.getStarted')} <ArrowRight size={18} />
            </button>
            <button 
              className="btn btn-outline btn-lg"
              onClick={() => setActiveView('discover')}
            >
              <Search size={18} /> {t('hero.explore')}
            </button>
          </div>

          <div className="hero-stats-row">
            <div className="hero-stat">
              <span className="stat-value">₹6,000+ Cr</span>
              <span className="stat-label">Welfare Benefits Mapped</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="stat-value">100%</span>
              <span className="stat-label">Verified Official Schemes</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="stat-value">3 Languages</span>
              <span className="stat-label">English, Tamil, Hindi Voice AI</span>
            </div>
          </div>
        </div>

        <div className="hero-art">
          <div className="art-card main-art-card">
            <div className="art-card-header">
              <ShieldCheck size={28} className="text-primary" />
              <div>
                <strong>GNS AI Assistant</strong>
                <div className="art-sub">Instant Eligibility Assessment</div>
              </div>
            </div>
            <div className="art-chat-bubble user-bubble">
              "Am I eligible for PM Kisan or Student Scholarships?"
            </div>
            <div className="art-chat-bubble ai-bubble">
              <Sparkles size={16} /> "Based on your income under ₹2.5L and Tamil Nadu domicile, you qualify for 4 central & state schemes!"
            </div>
            <div className="art-tags">
              <span className="badge badge-green">PM-KISAN (Eligible)</span>
              <span className="badge badge-blue">NMMSS Scholarship</span>
              <span className="badge badge-teal">PMAY Housing</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-container">
        <div className="section-header">
          <h2 className="section-title">How GNS Assistance Works</h2>
          <p className="section-desc">Four simple steps to discover, verify, and claim your government welfare benefits.</p>
        </div>

        <div className="steps-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="step-card">
              <div className="step-number">{step.num}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Beneficiary Categories */}
      <section className="section-container bg-subtle">
        <div className="section-header">
          <h2 className="section-title">Beneficiary Categories</h2>
          <p className="section-desc">Explore targeted government welfare schemes tailored to your occupation and life stage.</p>
        </div>

        <div className="grid-3">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="category-card card" onClick={() => setActiveView('discover')}>
                <div className="cat-icon-wrapper" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                  <Icon size={26} />
                </div>
                <h3 className="cat-title">{cat.title}</h3>
                <p className="cat-desc">{cat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Key Features Section */}
      <section className="section-container">
        <div className="section-header">
          <h2 className="section-title">Powerful Platform Features</h2>
          <p className="section-desc">Built with state-of-the-art AI and accessible UI design for every citizen.</p>
        </div>

        <div className="grid-3">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="feature-card card">
                <div className="feat-icon-ring">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="feat-title">{feat.title}</h3>
                <p className="feat-desc">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-banner">
        <div className="cta-content">
          <h2>Ready to Discover Your Eligible Schemes?</h2>
          <p>Create your profile in 2 minutes and let GNS Assistance find your welfare benefits.</p>
          <button 
            className="btn btn-secondary btn-lg"
            onClick={() => {
              setAuthMode('register');
              setAuthModalOpen(true);
            }}
          >
            Create Free Citizen Profile
          </button>
        </div>
      </section>

      <style>{`
        .landing-page {
          padding-bottom: 2rem;
        }

        .hero-section {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
          align-items: center;
          padding: 3rem 0 4rem;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -1px;
          line-height: 1.15;
          margin-bottom: 1.25rem;
        }

        .hero-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .hero-ctas {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .hero-stats-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }

        .stat-value {
          display: block;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--primary);
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .hero-stat-divider {
          width: 1px;
          height: 32px;
          background-color: var(--border);
        }

        .hero-art {
          display: flex;
          justify-content: center;
        }

        .main-art-card {
          width: 100%;
          max-width: 440px;
          background: #ffffff;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-lg);
          border-radius: var(--radius-lg);
          padding: 1.75rem;
        }

        .art-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .art-sub {
          font-size: 0.775rem;
          color: var(--text-secondary);
        }

        .art-chat-bubble {
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          margin-bottom: 0.85rem;
          line-height: 1.45;
        }

        .user-bubble {
          background-color: var(--bg-main);
          color: var(--text-main);
          border: 1px solid var(--border);
        }

        .ai-bubble {
          background-color: var(--primary-light);
          color: var(--primary-hover);
          font-weight: 500;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .art-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }

        .section-container {
          padding: 4rem 0;
        }

        .bg-subtle {
          background-color: #ffffff;
          border-radius: var(--radius-lg);
          padding: 3rem 2rem;
          border: 1px solid var(--border);
        }

        .section-header {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 3rem;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
        }

        .section-desc {
          font-size: 1.05rem;
          color: var(--text-secondary);
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .step-card {
          background-color: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.75rem;
          position: relative;
        }

        .step-number {
          font-family: 'Outfit', sans-serif;
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--primary);
          opacity: 0.25;
          margin-bottom: 0.5rem;
        }

        .step-title {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .step-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .category-card {
          cursor: pointer;
          transition: var(--transition);
        }

        .category-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary);
        }

        .cat-icon-wrapper {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .cat-title {
          font-size: 1.1rem;
          margin-bottom: 0.4rem;
        }

        .cat-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .feature-card {
          padding: 1.75rem;
        }

        .feat-icon-ring {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .feat-title {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .feat-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        .cta-banner {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: var(--radius-lg);
          padding: 4rem 2rem;
          text-align: center;
          color: #ffffff;
          margin-top: 3rem;
        }

        .cta-banner h2 {
          color: #ffffff;
          font-size: 2.25rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .cta-banner p {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 2rem;
        }

        @media (max-width: 900px) {
          .hero-section { grid-template-columns: 1fr; text-align: center; }
          .hero-ctas { justify-content: center; }
          .hero-stats-row { justify-content: center; }
          .steps-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .hero-title { font-size: 2.25rem; }
          .steps-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
