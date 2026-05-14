import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Notifications() {
  const { notifications, markAllRead, unreadCount } = useApp();
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top Bar */}
      <div style={{
        background: '#1e293b',
        padding: '18px 16px 14px',
        borderBottom: '1px solid #334155',
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 20,
            fontWeight: 800,
            color: '#f1f5f9',
          }}>
            Notifications
          </h1>
          <p style={{ fontSize: 12, color: '#64748b', marginTop: 3 }}>
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            style={{
              background: 'none',
              border: '1px solid #334155',
              color: '#818cf8',
              padding: '6px 12px',
              borderRadius: 8,
              fontSize: 12,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <i className="ti ti-checks" style={{ fontSize: 14 }} />
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
        {notifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#475569' }}>
            <i className="ti ti-bell-off" style={{ fontSize: 48, display: 'block', marginBottom: 14, color: '#334155' }} />
            No notifications yet
          </div>
        ) : (
          notifications.map((notif, i) => (
            <NotifCard
              key={notif.id}
              notif={notif}
              delay={i * 0.05}
              onClick={() => notif.eventId && navigate(`/event/${notif.eventId}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function NotifCard({ notif, delay, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: notif.unread ? '#1e293b' : '#161f30',
        border: `1px solid ${notif.unread ? '#334155' : '#1e293b'}`,
        borderLeft: notif.unread ? `3px solid #6366f1` : '3px solid #1e293b',
        borderRadius: 12,
        padding: '13px 14px',
        marginBottom: 10,
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        cursor: onClick ? 'pointer' : 'default',
        animation: `pageIn 0.3s ease ${delay}s both`,
        transition: 'background 0.15s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = '#253047'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = notif.unread ? '#1e293b' : '#161f30'; }}
    >
      {/* Icon */}
      <div style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: `${notif.iconColor}22`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontSize: 18,
        color: notif.iconColor,
      }}>
        <i className={`ti ${notif.icon}`} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13,
          fontWeight: notif.unread ? 600 : 500,
          color: notif.unread ? '#f1f5f9' : '#94a3b8',
          marginBottom: 3,
          lineHeight: 1.3,
        }}>
          {notif.title}
        </div>
        <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5, marginBottom: 5 }}>
          {notif.body}
        </div>
        <div style={{
          fontSize: 10,
          color: '#475569',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          <i className="ti ti-clock" style={{ fontSize: 11 }} />
          {notif.time}
        </div>
      </div>

      {/* Unread dot */}
      {notif.unread && (
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#6366f1',
          flexShrink: 0,
          marginTop: 4,
        }} />
      )}
    </div>
  );
}
