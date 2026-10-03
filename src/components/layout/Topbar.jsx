import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Globe, 
  Menu, 
  User, 
  LogOut, 
  Check, 
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Topbar({ setMobileOpen }) {
  const { 
    user, 
    logout, 
    userProfile, 
    activeView, 
    setActiveView, 
    globalSearchQuery, 
    setGlobalSearchQuery,
    notifications,
    markNotificationRead,
    markAllNotificationsRead
  } = useApp();

  const { lang, setLang, t } = useLanguage();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (globalSearchQuery.trim()) {
      setActiveView('discover');
    }
  };

  const getBreadcrumbLabel = () => {
    switch (activeView) {
      case 'dashboard': return t('nav.dashboard');
      case 'discover': return t('nav.discover');
      case 'eligibility': return t('nav.eligibility');
      case 'ai': return t('nav.aiAssistant');
      case 'saved': return t('nav.saved');
      case 'comparison': return t('nav.comparison');
      case 'documents': return t('nav.documentGuide');
      case 'notifications': return t('nav.notifications');
      case 'profile': return t('nav.profile');
      case 'admin': return t('nav.admin');
      default: return 'GNS Assistance';
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(prev => !prev)}
          title="Open Menu"
        >
          <Menu size={22} />
        </button>

        <div className="breadcrumbs">
          <span className="bc-root" onClick={() => setActiveView('landing')}>Home</span>
          <span className="bc-sep">/</span>
          <span className="bc-active">{getBreadcrumbLabel()}</span>
        </div>
      </div>

      {/* Global Search Bar */}
      <form className="topbar-search" onSubmit={handleSearchSubmit}>
        <Search className="search-icon" size={18} />
        <input 
          type="text"
          className="search-input"
          placeholder="Search government schemes, benefits, documents..."
          value={globalSearchQuery}
          onChange={(e) => setGlobalSearchQuery(e.target.value)}
        />
      </form>

      {/* Action Controls */}
      <div className="topbar-actions">
        {/* Language Selector Dropdown */}
        <div className="dropdown-wrapper">
          <button 
            className="topbar-btn lang-btn"
            onClick={() => setLangOpen(!langOpen)}
            title="Switch Language"
          >
            <Globe size={18} />
            <span className="lang-code">{lang.toUpperCase()}</span>
            <ChevronDown size={14} />
          </button>

          {langOpen && (
            <div className="dropdown-menu lang-menu">
              <button 
                className={`dropdown-item ${lang === 'en' ? 'active' : ''}`}
                onClick={() => { setLang('en'); setLangOpen(false); }}
              >
                English {lang === 'en' && <Check size={16} />}
              </button>
              <button 
                className={`dropdown-item ${lang === 'ta' ? 'active' : ''}`}
                onClick={() => { setLang('ta'); setLangOpen(false); }}
              >
                தமிழ் (Tamil) {lang === 'ta' && <Check size={16} />}
              </button>
              <button 
                className={`dropdown-item ${lang === 'hi' ? 'active' : ''}`}
                onClick={() => { setLang('hi'); setLangOpen(false); }}
              >
                हिन्दी (Hindi) {lang === 'hi' && <Check size={16} />}
              </button>
            </div>
          )}
        </div>

        {/* Notifications Bell Dropdown */}
        <div className="dropdown-wrapper">
          <button 
            className="topbar-btn notif-btn"
            onClick={() => setNotifOpen(!notifOpen)}
            title="Notifications"
          >
            <Bell size={19} />
            {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
          </button>

          {notifOpen && (
            <div className="dropdown-menu notif-menu">
              <div className="notif-header">
                <strong>Notifications</strong>
                {unreadCount > 0 && (
                  <button className="mark-read-link" onClick={markAllNotificationsRead}>
                    Mark all read
                  </button>
                )}
              </div>
              <div className="notif-list">
                {notifications.length === 0 ? (
                  <div className="empty-notif">No notifications</div>
                ) : (
                  notifications.slice(0, 5).map((n) => (
                    <div 
                      key={n.id} 
                      className={`notif-item ${!n.read ? 'unread' : ''}`}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.schemeId) setActiveView('discover');
                        setNotifOpen(false);
                      }}
                    >
                      <div className="notif-title">{n.title}</div>
                      <div className="notif-msg">{n.message}</div>
                      <div className="notif-time">{n.timestamp}</div>
                    </div>
                  ))
                )}
              </div>
              <div className="notif-footer">
                <button 
                  className="view-all-btn"
                  onClick={() => { setActiveView('notifications'); setNotifOpen(false); }}
                >
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar Dropdown */}
        <div className="dropdown-wrapper">
          {user ? (
            <button 
              className="user-profile-trigger"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="avatar-circle">
                {userProfile.fullName ? userProfile.fullName[0].toUpperCase() : 'U'}
              </div>
              <div className="user-info-text desktop-only">
                <span className="user-name">{userProfile.fullName || 'User'}</span>
                <span className="user-role">{user.role === 'admin' ? 'Administrator' : 'Citizen'}</span>
              </div>
              <ChevronDown size={14} className="desktop-only" />
            </button>
          ) : (
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setActiveView('auth')}
            >
              <User size={16} /> Login
            </button>
          )}

          {profileOpen && user && (
            <div className="dropdown-menu profile-menu">
              <div className="menu-header">
                <div className="menu-user-name">{userProfile.fullName}</div>
                <div className="menu-user-email">{userProfile.email}</div>
              </div>
              <div className="menu-divider" />
              <button 
                className="dropdown-item"
                onClick={() => { setActiveView('profile'); setProfileOpen(false); }}
              >
                <User size={16} /> My Profile ({userProfile.completionPercentage || 0}% Complete)
              </button>
              <button 
                className="dropdown-item"
                onClick={() => { setActiveView('ai'); setProfileOpen(false); }}
              >
                <Sparkles size={16} /> AI Assistant
              </button>
              <div className="menu-divider" />
              <button 
                className="dropdown-item logout-item"
                onClick={() => { logout(); setProfileOpen(false); }}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .topbar {
          height: 70px;
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 90;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .mobile-menu-btn {
          display: none;
          color: var(--text-main);
        }

        .breadcrumbs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .bc-root {
          cursor: pointer;
          font-weight: 500;
        }

        .bc-root:hover {
          color: var(--primary);
        }

        .bc-active {
          font-weight: 600;
          color: var(--text-main);
        }

        .topbar-search {
          position: relative;
          width: 380px;
        }

        .search-icon {
          position: absolute;
          left: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
        }

        .search-input {
          width: 100%;
          padding: 0.55rem 1rem 0.55rem 2.4rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          background-color: var(--bg-main);
          outline: none;
          transition: var(--transition);
        }

        .search-input:focus {
          border-color: var(--primary);
          background-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
        }

        .topbar-actions {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .dropdown-wrapper {
          position: relative;
        }

        .topbar-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border);
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: var(--transition);
          position: relative;
        }

        .topbar-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
          background-color: var(--primary-light);
        }

        .lang-btn {
          width: auto;
          padding: 0 0.85rem;
          gap: 0.4rem;
          font-size: 0.825rem;
          font-weight: 600;
        }

        .notif-badge {
          position: absolute;
          top: -3px;
          right: -3px;
          background-color: var(--error);
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #ffffff;
        }

        .user-profile-trigger {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border);
          background-color: #ffffff;
          transition: var(--transition);
        }

        .user-profile-trigger:hover {
          border-color: var(--primary);
        }

        .avatar-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: #ffffff;
          font-weight: 700;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-info-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.2;
        }

        .user-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .user-role {
          font-size: 0.725rem;
          color: var(--text-secondary);
        }

        .dropdown-menu {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          background-color: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          min-width: 220px;
          z-index: 200;
          overflow: hidden;
          animation: slideUp 0.18s ease;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0.7rem 1rem;
          font-size: 0.875rem;
          color: var(--text-main);
          transition: var(--transition);
        }

        .dropdown-item:hover {
          background-color: var(--primary-light);
          color: var(--primary);
        }

        .dropdown-item.active {
          font-weight: 600;
          color: var(--primary);
        }

        .notif-menu {
          width: 320px;
        }

        .notif-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1rem;
          border-bottom: 1px solid var(--border);
          font-size: 0.9rem;
        }

        .mark-read-link {
          font-size: 0.775rem;
          color: var(--primary);
          font-weight: 600;
        }

        .notif-list {
          max-height: 280px;
          overflow-y: auto;
        }

        .notif-item {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
          transition: var(--transition);
        }

        .notif-item:hover {
          background-color: #F8FAFC;
        }

        .notif-item.unread {
          background-color: #EFF6FF;
        }

        .notif-title {
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-main);
        }

        .notif-msg {
          font-size: 0.785rem;
          color: var(--text-secondary);
          margin-top: 2px;
        }

        .notif-time {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .notif-footer {
          padding: 0.65rem;
          text-align: center;
          border-top: 1px solid var(--border);
          background-color: #F8FAFC;
        }

        .view-all-btn {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary);
        }

        .profile-menu {
          min-width: 240px;
        }

        .menu-header {
          padding: 1rem;
          background-color: #F8FAFC;
        }

        .menu-user-name {
          font-weight: 700;
          font-size: 0.925rem;
        }

        .menu-user-email {
          font-size: 0.775rem;
          color: var(--text-secondary);
        }

        .menu-divider {
          height: 1px;
          background-color: var(--border);
        }

        .logout-item:hover {
          background-color: var(--error-bg);
          color: var(--error);
        }

        @media (max-width: 768px) {
          .topbar { padding: 0 1rem; }
          .mobile-menu-btn { display: block; }
          .topbar-search { display: none; }
          .desktop-only { display: none; }
        }
      `}</style>
    </header>
  );
}
