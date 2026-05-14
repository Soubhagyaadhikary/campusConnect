import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EVENTS } from '../data/events';
import { useApp } from '../context/AppContext';
import QRModal from '../components/QRModal';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isRegistered, toggleRegistration } = useApp();
  const [showQR, setShowQR] = useState(false);

  const event = EVENTS.find((e) => e.id === Number(id));
  if (!event) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>
        <i className="ti ti-alert-circle" style={{ fontSize: 40, display: 'block', marginBottom: 12 }} />
        Event not found.
        <br />
        <button onClick={() => navigate('/')} style={{ color: '#818cf8', background: 'none', border: 'none', cursor: 'pointer', marginTop: 10, fontSize: 14 }}>
          ← Go Back
        </button>
      </div>
    );
  }

  const reg = isRegistered(event.id);

  const exportCalendar = () => {
    const start = event.dateObj.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const end = new Date(event.dateObj.getTime() + 2 * 60 * 60 * 1000)
      .toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//CampusEvent//EN',
      'BEGIN:VEVENT',
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
      `LOCATION:${event.venue}`,
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${event.title.replace(/\s+/g, '_')}.ics`;
    a.click();
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
        {/* Back button */}
        <div style={{
          background: '#1e293b',
          borderBottom: '1px solid #334155',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '12px 16px',
              cursor: 'pointer',
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <i className="ti ti-arrow-left" style={{ fontSize: 16 }} /> Back to Events
          </button>
        </div>

        {/* Hero */}
        <div style={{
          background: event.heroGrad,
          padding: '24px 18px 20px',
          borderBottom: '1px solid #334155',
          flexShrink: 0,
        }}>
          <span style={{
            display: 'inline-block',
            background: event.badgeBg,
            color: event.badgeText,
            fontSize: 11,
            fontWeight: 600,
            padding: '4px 12px',
            borderRadius: 10,
            marginBottom: 12,
            letterSpacing: '0.03em',
          }}>
            {event.category}
          </span>
          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 20,
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.3,
            marginBottom: 6,
          }}>
            {event.title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13 }}>
            Organized by {event.host}
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '18px 16px', flex: 1 }}>
          {/* Info grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
            <InfoBox label="Date" value={event.date} icon="ti-calendar" />
            <InfoBox label="Time" value={event.time} icon="ti-clock" />
            <InfoBox label="Venue" value={event.venue} icon="ti-map-pin" />
            <InfoBox
              label="Availability"
              value={event.spots === Infinity ? 'Open for all' : `${event.spots} / ${event.total} spots`}
              icon="ti-users"
              highlight={event.spots !== Infinity && event.spots <= 10}
            />
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 18 }}>
            {event.tags.map((tag) => (
              <span key={tag} style={{
                background: '#0f172a',
                border: '1px solid #334155',
                color: '#94a3b8',
                fontSize: 11,
                padding: '4px 10px',
                borderRadius: 8,
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <div style={{ marginBottom: 22 }}>
            <h3 style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#475569',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              marginBottom: 8,
            }}>
              About this event
            </h3>
            <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>
              {event.description}
            </p>
          </div>

          {/* CTA Buttons */}
          <button
            onClick={() => toggleRegistration(event)}
            style={{
              width: '100%',
              background: reg ? '#064e3b' : '#6366f1',
              border: `1px solid ${reg ? '#10b981' : '#6366f1'}`,
              color: reg ? '#6ee7b7' : '#fff',
              borderRadius: 13,
              padding: '14px 0',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 9,
              marginBottom: 10,
              transition: 'all 0.15s',
              fontFamily: "'Syne', sans-serif",
              letterSpacing: '-0.01em',
            }}
          >
            <i className={`ti ${reg ? 'ti-check' : 'ti-calendar-plus'}`} style={{ fontSize: 18 }} />
            {reg ? 'Registered!' : 'Register Now'}
          </button>

          {/* Secondary buttons row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
            <SecondaryBtn
              icon="ti-qrcode"
              label="View QR Code"
              onClick={() => setShowQR(true)}
              disabled={!reg}
              hint={!reg ? 'Register first' : undefined}
            />
            <SecondaryBtn
              icon="ti-calendar-plus"
              label="Add to Calendar"
              onClick={exportCalendar}
            />
          </div>
        </div>
      </div>

      {showQR && <QRModal event={event} onClose={() => setShowQR(false)} />}
    </>
  );
}

function InfoBox({ label, value, icon, highlight }) {
  return (
    <div style={{
      background: '#1e293b',
      border: `1px solid ${highlight ? '#78350f' : '#334155'}`,
      borderRadius: 10,
      padding: '10px 12px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
        <i className={`ti ${icon}`} style={{ fontSize: 13, color: '#475569' }} />
        <span style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600 }}>
          {label}
        </span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: highlight ? '#f59e0b' : '#f1f5f9' }}>
        {value}
      </div>
    </div>
  );
}

function SecondaryBtn({ icon, label, onClick, disabled, hint }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      title={hint}
      style={{
        background: '#1e293b',
        border: '1px solid #334155',
        color: disabled ? '#475569' : '#94a3b8',
        borderRadius: 10,
        padding: '11px 0',
        fontSize: 12,
        fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        transition: 'all 0.15s',
        fontFamily: "'DM Sans', sans-serif",
        opacity: disabled ? 0.5 : 1,
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.borderColor = '#475569'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#334155'; }}
    >
      <i className={`ti ${icon}`} style={{ fontSize: 18 }} />
      {label}
    </button>
  );
}
