import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  CheckCircle2, 
  Bot, 
  Bookmark, 
  Scale, 
  FileText, 
  Bell, 
  User, 
  ShieldCheck, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Landmark
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { activeView, setActiveView, user, logout, savedSchemeIds, notifications } = useApp();
  const { t } = useLanguage();

  const unreadCount = notifications.filter(n => !n.read).length;

  const menuItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { id: 'discover', label: t('nav.discover'), icon: Search },
    { id: 'eligibility', label: t('nav.eligibility'), icon: CheckCircle2 },
    { id: 'ai', label: t('nav.aiAssistant'), icon: Bot, badge: 'AI' },
    { id: 'saved', label: t('nav.saved'), icon: Bookmark, count: savedSchemeIds.length },
    { id: 'comparison', label: t('nav.comparison'), icon: Scale },
    { id: 'documents', label: t('nav.documentGuide'), icon: FileText },
    { id: 'notifications', label: t('nav.notifications'), icon: Bell, count: unreadCount, countColor: 'badge-amber' },
    { id: 'profile', label: t('nav.profile'), icon: User },
  ];

  if (user && user.role === 'admin') {
    menuItems.push({ id: 'admin', label: t('nav.admin'), icon: ShieldCheck, badge: 'ADMIN' });
  }

  const handleNavClick = (viewId) => {
    setActiveView(viewId);
    if (window.innerWidth <= 768) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            zIndex: 99
          }}
        />
      )}

      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="brand-logo">
            <Landmark className="brand-icon" size={26} />
            {!collapsed && <span className="brand-name">{t('appName')}</span>}
          </div>
          
          <button 
            className="collapse-btn desktop-only"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation List */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="nav-icon" size={20} />
                {!collapsed && <span className="nav-label">{item.label}</span>}
                
                {!collapsed && item.badge && (
                  <span className="badge badge-blue nav-badge">{item.badge}</span>
                )}

                {!collapsed && item.count !== undefined && item.count > 0 && (
                  <span className={`badge ${item.countColor || 'badge-gray'} nav-count`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer / User Profile & Logout */}
        <div className="sidebar-footer">
          {user ? (
            <button className="nav-item logout-btn" onClick={logout}>
              <LogOut className="nav-icon" size={20} />
              {!collapsed && <span>{t('nav.logout')}</span>}
            </button>
          ) : (
            <button className="nav-item login-btn" onClick={() => setActiveView('auth')}>
              <User className="nav-icon" size={20} />
              {!collapsed && <span>{t('nav.login')}</span>}
            </button>
          )}
        </div>
      </aside>

      <style>{`
        .sidebar {
          width: 260px;
          background-color: var(--bg-sidebar);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: sticky;
          top: 0;
          z-index: 100;
          transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sidebar.collapsed {
          width: 76px;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.25rem;
          border-bottom: 1px solid var(--border);
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .brand-icon {
          color: var(--primary);
          flex-shrink: 0;
        }

        .brand-name {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.2rem;
          color: var(--text-main);
          letter-spacing: -0.3px;
        }

        .collapse-btn {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          border: 1px solid var(--border);
          background-color: var(--bg-main);
        }

        .collapse-btn:hover {
          color: var(--primary);
          border-color: var(--primary);
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          overflow-y: auto;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          width: 100%;
          padding: 0.75rem 0.9rem;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.925rem;
          transition: var(--transition);
          text-align: left;
        }

        .nav-item:hover {
          background-color: var(--primary-light);
          color: var(--primary);
        }

        .nav-item.active {
          background-color: var(--primary);
          color: #ffffff;
          font-weight: 600;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
        }

        .nav-item.active .nav-icon {
          color: #ffffff;
        }

        .nav-label {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .nav-badge, .nav-count {
          margin-left: auto;
        }

        .sidebar-footer {
          padding: 1rem 0.75rem;
          border-top: 1px solid var(--border);
        }

        .logout-btn:hover {
          background-color: var(--error-bg);
          color: var(--error);
        }

        @media (max-width: 768px) {
          .desktop-only { display: none; }
          
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            transform: translateX(-100%);
            width: 260px !important;
            box-shadow: var(--shadow-lg);
          }

          .sidebar.mobile-open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
