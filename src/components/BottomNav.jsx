import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const NAV_ITEMS = [
  { path: '/student-home',  icon: 'ti-home',           label: 'Home'      },
  { path: '/my-events',    icon: 'ti-calendar-event', label: 'My Events' },
  { path: '/notifications',icon: 'ti-bell',            label: 'Alerts'    },
  { path: '/profile',      icon: 'ti-user-circle',    label: 'Profile'   },
];

const styles = {
  nav: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: 480,
    background: 'rgba(15,23,42,0.95)',
    backdropFilter: 'blur(16px)',
    borderTop: '1px solid #334155',
    display: 'flex',
    padding: '8px 0 14px',
    zIndex: 100,
  },
  item: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    cursor: 'pointer',
    color: '#64748b',
    fontSize: 10,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    padding: '4px 0',
    transition: 'color 0.15s',
    position: 'relative',
    border: 'none',
    background: 'none',
    letterSpacing: '0.02em',
  },
  activeItem: {
    color: '#818cf8',
  },
  icon: {
    fontSize: 22,
    lineHeight: 1,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: '50%',
    background: '#6366f1',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: '50%',
    transform: 'translateX(8px)',
    background: '#ef4444',
    color: '#fff',
    fontSize: 9,
    fontWeight: 700,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 3px',
  },
};

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { unreadCount } = useApp();

  return (
    <nav style={styles.nav}>
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            style={{ ...styles.item, ...(isActive ? styles.activeItem : {}) }}
            onClick={() => navigate(item.path)}
          >
            <i className={`ti ${item.icon}`} style={styles.icon} />
            <span>{item.label}</span>
            {isActive && <div style={styles.dot} />}
            {item.path === '/notifications' && unreadCount > 0 && (
              <span style={styles.badge}>{unreadCount}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
