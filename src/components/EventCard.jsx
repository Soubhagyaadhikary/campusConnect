import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function EventCard({ event }) {
  const navigate = useNavigate();
  const { isRegistered, toggleRegistration } = useApp();
  const reg = isRegistered(event.id);
  const spotsText =
    event.spots === Infinity
      ? 'Open for all'
      : event.spots <= 10
      ? `⚡ Only ${event.spots} spots left`
      : `${event.spots} spots left`;
  const isLow = event.spots !== Infinity && event.spots <= 10;

  const handleRegister = (e) => {
    e.stopPropagation();
    toggleRegistration(event);
  };

  return (
    <div
      onClick={() => navigate(`/event/${event.id}`)}
      style={{
        background: '#1e293b',
        border: '1px solid #334155',
        borderLeft: `3px solid ${event.color}`,
        borderRadius: 14,
        padding: '14px 16px',
        marginBottom: 12,
        cursor: 'pointer',
        transition: 'transform 0.15s, border-color 0.15s',
        animation: 'pageIn 0.3s ease both',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = event.color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#334155';
        e.currentTarget.style.borderLeftColor = event.color;
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
        <h3 style={{
          fontSize: 14,
          fontWeight: 600,
          color: '#f1f5f9',
          lineHeight: 1.35,
          fontFamily: "'Syne', sans-serif",
          flex: 1,
        }}>
          {event.title}
        </h3>
        <span style={{
          background: event.badgeBg,
          color: event.badgeText,
          fontSize: 10,
          fontWeight: 600,
          padding: '3px 9px',
          borderRadius: 10,
          whiteSpace: 'nowrap',
          flexShrink: 0,
          letterSpacing: '0.03em',
        }}>
          {event.category}
        </span>
      </div>

      {/* Meta */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <MetaRow icon="ti-calendar" text={event.date} />
        <MetaRow icon="ti-clock" text={event.time} />
        <MetaRow icon="ti-map-pin" text={event.venue} />
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
        paddingTop: 12,
        borderTop: '1px solid #334155',
      }}>
        <span style={{
          fontSize: 11,
          color: isLow ? '#f59e0b' : '#64748b',
          fontWeight: isLow ? 600 : 400,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          <i className="ti ti-users" style={{ fontSize: 12 }} />
          {spotsText}
        </span>

        <button
          onClick={handleRegister}
          style={{
            background: reg ? '#064e3b' : '#4f46e5',
            color: reg ? '#6ee7b7' : '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '6px 14px',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            transition: 'background 0.15s, transform 0.1s',
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <i className={`ti ${reg ? 'ti-check' : 'ti-calendar-plus'}`} style={{ fontSize: 13 }} />
          {reg ? 'Registered' : 'Register'}
        </button>
      </div>
    </div>
  );
}

function MetaRow({ icon, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: '#94a3b8', fontSize: 12 }}>
      <i className={`ti ${icon}`} style={{ fontSize: 13, color: '#64748b', flexShrink: 0 }} />
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{text}</span>
    </div>
  );
}
