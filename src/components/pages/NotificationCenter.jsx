import React from 'react';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Clock, 
  Sparkles, 
  UserCheck, 
  Building2 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import DisclaimerBanner from '../common/DisclaimerBanner';

export default function NotificationCenter() {
  const { notifications, markNotificationRead, markAllNotificationsRead, clearNotifications, setActiveView } = useApp();
  const { t } = useLanguage();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications-page">
      <DisclaimerBanner />

      <div className="notif-page-header card">
        <div>
          <h1>{t('nav.notifications')} ({unreadCount} Unread)</h1>
          <p>Important welfare updates, impending deadlines, and profile reminders.</p>
        </div>

        <div className="notif-header-actions">
          {unreadCount > 0 && (
            <button className="btn btn-outline btn-sm" onClick={markAllNotificationsRead}>
              <CheckCheck size={16} /> Mark All as Read
            </button>
          )}

          {notifications.length > 0 && (
            <button className="btn btn-ghost btn-sm text-error" onClick={clearNotifications}>
              <Trash2 size={16} /> Clear All
            </button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="empty-state card">
          <Bell size={48} className="text-muted" />
          <h3>No notifications at this time</h3>
          <p>You're all caught up! Check back later for scheme deadline alerts and updates.</p>
        </div>
      ) : (
        <div className="notifications-list card">
          {notifications.map((n) => (
            <div 
              key={n.id} 
              className={`notif-card-item ${!n.read ? 'unread-card' : ''}`}
              onClick={() => markNotificationRead(n.id)}
            >
              <div className="notif-type-icon">
                {n.type === 'deadline' && <Clock size={20} className="text-warning" />}
                {n.type === 'scheme' && <Sparkles size={20} className="text-primary" />}
                {n.type === 'profile' && <UserCheck size={20} className="text-secondary" />}
                {n.type === 'update' && <Building2 size={20} className="text-success" />}
              </div>

              <div className="notif-body">
                <div className="notif-top-line">
                  <span className="notif-card-title">{n.title}</span>
                  <span className="notif-card-time">{n.timestamp}</span>
                </div>
                <p className="notif-card-msg">{n.message}</p>
              </div>

              {!n.read && <span className="unread-dot" />}
            </div>
          ))}
        </div>
      )}

      <style>{`
        .notifications-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .notif-page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .notif-page-header h1 {
          font-size: 1.6rem;
          margin-bottom: 0.25rem;
        }

        .notif-page-header p {
          color: var(--text-secondary);
          font-size: 0.925rem;
        }

        .notif-header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .notifications-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.5rem;
        }

        .notif-card-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.1rem 1.25rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          background-color: #ffffff;
          transition: var(--transition);
          cursor: pointer;
          position: relative;
        }

        .notif-card-item:hover {
          background-color: var(--bg-main);
        }

        .notif-card-item.unread-card {
          background-color: #EFF6FF;
          border-color: #93C5FD;
        }

        .notif-type-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #ffffff;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .notif-body {
          flex: 1;
        }

        .notif-top-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.25rem;
        }

        .notif-card-title {
          font-weight: 700;
          font-size: 0.95rem;
        }

        .notif-card-time {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .notif-card-msg {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .unread-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--primary);
          align-self: center;
        }
      `}</style>
    </div>
  );
}
