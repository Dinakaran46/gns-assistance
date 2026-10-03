import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Bookmark, 
  Clock, 
  ArrowRight, 
  Search, 
  Bot, 
  User, 
  Building2, 
  Calendar,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { evaluateEligibility } from '../../utils/eligibilityEngine';
import DisclaimerBanner from '../common/DisclaimerBanner';

export default function Dashboard() {
  const { 
    userProfile, 
    schemes, 
    savedSchemeIds, 
    toggleSaveScheme, 
    setActiveView, 
    setSelectedSchemeDetail 
  } = useApp();

  const { t } = useLanguage();

  // Evaluate schemes for user profile
  const evaluatedSchemes = schemes.map(scheme => {
    const evalRes = evaluateEligibility(userProfile, scheme);
    return { ...scheme, evalRes };
  });

  const eligibleCount = evaluatedSchemes.filter(s => s.evalRes.tier === "Potentially Eligible").length;
  const savedCount = savedSchemeIds.length;
  const upcomingDeadlinesCount = schemes.filter(s => s.endDate && new Date(s.endDate) > new Date()).length;

  const recommendedSchemes = evaluatedSchemes.slice(0, 4);

  return (
    <div className="dashboard-page">
      <DisclaimerBanner />

      {/* Welcome Hero Banner */}
      <div className="welcome-card card">
        <div className="welcome-text">
          <h1>{t('dashboard.welcome')}, {userProfile.fullName || 'Citizen'}! 👋</h1>
          <p>{t('dashboard.subtext')}</p>
        </div>
        <div className="welcome-cta">
          <button className="btn btn-primary" onClick={() => setActiveView('eligibility')}>
            <CheckCircle2 size={18} /> {t('dashboard.checkEligibility')}
          </button>
        </div>
      </div>

      {/* 4 Statistics KPI Cards */}
      <div className="grid-4 stats-grid">
        <div className="stat-card card">
          <div className="stat-icon-bg bg-primary-light">
            <Building2 size={22} className="text-primary" />
          </div>
          <div>
            <div className="stat-num">{schemes.length}</div>
            <div className="stat-label">{t('dashboard.totalSchemes')}</div>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon-bg bg-success-light">
            <CheckCircle2 size={22} className="text-success" />
          </div>
          <div>
            <div className="stat-num">{eligibleCount}</div>
            <div className="stat-label">{t('dashboard.eligibleSchemes')}</div>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon-bg bg-primary-light">
            <Bookmark size={22} className="text-primary" />
          </div>
          <div>
            <div className="stat-num">{savedCount}</div>
            <div className="stat-label">{t('dashboard.savedSchemes')}</div>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon-bg bg-warning-light">
            <Clock size={22} className="text-warning" />
          </div>
          <div>
            <div className="stat-num">{upcomingDeadlinesCount}</div>
            <div className="stat-label">{t('dashboard.upcomingDeadlines')}</div>
          </div>
        </div>
      </div>

      {/* Quick Action Toolbar */}
      <div className="quick-actions-bar card">
        <h3 className="quick-title">{t('dashboard.quickActions')}</h3>
        <div className="quick-buttons">
          <button className="quick-btn" onClick={() => setActiveView('eligibility')}>
            <CheckCircle2 size={18} className="text-primary" />
            <span>Check Eligibility</span>
          </button>
          <button className="quick-btn" onClick={() => setActiveView('ai')}>
            <Bot size={18} className="text-secondary" />
            <span>Ask AI Assistant</span>
          </button>
          <button className="quick-btn" onClick={() => setActiveView('discover')}>
            <Search size={18} className="text-success" />
            <span>Explore Schemes</span>
          </button>
          <button className="quick-btn" onClick={() => setActiveView('profile')}>
            <User size={18} className="text-warning" />
            <span>Update Profile</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout (Recommended Schemes + Timeline Sidebar) */}
      <div className="dashboard-main-grid">
        {/* Recommended Schemes */}
        <div className="recommended-section">
          <div className="section-title-row">
            <h2>{t('dashboard.recommendedTitle')}</h2>
            <button className="btn-ghost" onClick={() => setActiveView('discover')}>
              View All ({schemes.length}) <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid-2">
            {recommendedSchemes.map((scheme) => {
              const isSaved = savedSchemeIds.includes(scheme.id);

              return (
                <div key={scheme.id} className="scheme-card card">
                  <div className="scheme-card-header">
                    <span className="badge badge-blue">{scheme.category}</span>
                    <span className={`badge ${scheme.evalRes.statusBadge}`}>
                      {scheme.evalRes.tier}
                    </span>
                  </div>

                  <h3 className="scheme-name">{scheme.name}</h3>
                  <div className="scheme-dept">{scheme.department}</div>

                  <p className="scheme-desc">{scheme.shortDescription}</p>

                  <div className="scheme-benefits-box">
                    <strong>Key Benefit:</strong> {scheme.benefits[0]}
                  </div>

                  <div className="scheme-card-actions">
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => setSelectedSchemeDetail(scheme)}
                    >
                      View Details
                    </button>
                    <button 
                      className={`btn btn-outline btn-sm ${isSaved ? 'saved-active' : ''}`}
                      onClick={() => toggleSaveScheme(scheme.id)}
                    >
                      <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
                      {isSaved ? 'Saved' : 'Save'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Widgets (Deadlines & Recent Activity) */}
        <div className="dashboard-sidebar-widgets">
          {/* Upcoming Deadlines Timeline */}
          <div className="widget-card card">
            <h3 className="widget-title">
              <Calendar size={18} className="text-warning" /> Upcoming Deadlines
            </h3>
            <div className="timeline-list">
              {schemes.slice(0, 3).map((scheme) => (
                <div key={scheme.id} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="timeline-scheme-name">{scheme.name}</div>
                    <div className="timeline-date">End Date: {scheme.endDate || 'Ongoing'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="widget-card card">
            <h3 className="widget-title">
              <Clock size={18} className="text-primary" /> {t('dashboard.recentActivity')}
            </h3>
            <ul className="activity-list">
              <li>
                <span className="act-bullet" /> Saved <strong>PM Kisan Samman Nidhi</strong> to bookmarks.
              </li>
              <li>
                <span className="act-bullet" /> Completed eligibility check for <strong>Student Scholarships</strong>.
              </li>
              <li>
                <span className="act-bullet" /> Profile updated to <strong>85% complete</strong>.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .welcome-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, #ffffff 0%, #EFF6FF 100%);
          border-color: var(--border-focus);
        }

        .welcome-text h1 {
          font-size: 1.6rem;
          margin-bottom: 0.25rem;
        }

        .welcome-text p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .stats-grid {
          margin-top: 0.5rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1.1rem;
        }

        .stat-icon-bg {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-num {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.825rem;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .quick-actions-bar {
          padding: 1.25rem 1.5rem;
        }

        .quick-title {
          font-size: 0.95rem;
          margin-bottom: 0.85rem;
        }

        .quick-buttons {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .quick-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background-color: var(--bg-main);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-main);
          transition: var(--transition);
        }

        .quick-btn:hover {
          border-color: var(--primary);
          background-color: #ffffff;
          box-shadow: var(--shadow-sm);
        }

        .dashboard-main-grid {
          display: grid;
          grid-template-columns: 2.5fr 1fr;
          gap: 1.75rem;
        }

        .section-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .scheme-card {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .scheme-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .scheme-name {
          font-size: 1.1rem;
          line-height: 1.3;
        }

        .scheme-dept {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .scheme-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.45;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .scheme-benefits-box {
          background-color: var(--bg-main);
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-sm);
          font-size: 0.825rem;
          color: var(--text-main);
          border: 1px solid var(--border);
        }

        .scheme-card-actions {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-top: auto;
          padding-top: 0.5rem;
        }

        .saved-active {
          border-color: var(--primary);
          color: var(--primary);
          background-color: var(--primary-light);
        }

        .widget-card {
          margin-bottom: 1.5rem;
        }

        .widget-title {
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .timeline-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .timeline-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          position: relative;
        }

        .timeline-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--warning);
          margin-top: 5px;
          flex-shrink: 0;
        }

        .timeline-scheme-name {
          font-size: 0.85rem;
          font-weight: 600;
        }

        .timeline-date {
          font-size: 0.775rem;
          color: var(--text-secondary);
        }

        .activity-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.825rem;
          color: var(--text-secondary);
        }

        .act-bullet {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--primary);
          margin-right: 0.4rem;
        }

        @media (max-width: 1024px) {
          .dashboard-main-grid { grid-template-columns: 1fr; }
          .quick-buttons { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
