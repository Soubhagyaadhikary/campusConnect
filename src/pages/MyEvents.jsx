import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EVENTS } from '../data/events';
import { useApp } from '../context/AppContext';
import QRModal from '../components/QRModal';

export default function MyEvents() {
  const navigate = useNavigate();
  const { registered } = useApp();
  const [qrEvent, setQrEvent] = useState(null);

  const myEvents = EVENTS.filter((e) => registered.has(e.id));

  const exportCalendar = (event) => {
    const start = event.dateObj.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const end = new Date(event.dateObj.getTime() + 2 * 60 * 60 * 1000)
      .toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//CampusEvent//EN',
      'BEGIN:VEVENT',
      `DTSTART:${start}`, `DTEND:${end}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
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
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Top Bar */}
        <div style={{
          background: '#1e293b',
          padding: '18px 16px 14px',
          borderBottom: '1px solid #334155',
          flexShrink: 0,
        }}>
          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 20,
            fontWeight: 800,
            color: '#f1f5f9',
          }}>
            My Events
          </h1>
          <p style={{ fontSize: 12, color: '#64748b', marginTop: 3 }}>
            {myEvents.length} registration{myEvents.length !== 1 ? 's' : ''} · tap for QR
          </p>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px' }}>
          {myEvents.length === 0 ? (
            <EmptyState onBrowse={() => navigate('/')} />
          ) : (
            <>
              <SectionLabel>Registered Events</SectionLabel>
              {myEvents.map((ev) => (
                <MyEventCard
                  key={ev.id}
                  event={ev}
                  onView={() => navigate(`/event/${ev.id}`)}
                  onQR={() => setQrEvent(ev)}
                  onCalendar={() => exportCalendar(ev)}
                />
              ))}

              {/* Calendar export all */}
              <div style={{
                marginTop: 20,
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: 12,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}>
                <i className="ti ti-calendar-stats" style={{ fontSize: 22, color: '#6366f1' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>Sync your schedule</div>
                  <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>Export all events to your calendar app</div>
                </div>
                <button
                  onClick={() => myEvents.forEach(exportCalendar)}
                  style={{
                    background: '#312e81',
                    border: '1px solid #4f46e5',
                    color: '#a5b4fc',
                    padding: '7px 14px',
                    borderRadius: 8,
                    fontSize: 12,
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Export All
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {qrEvent && <QRModal event={qrEvent} onClose={() => setQrEvent(null)} />}
    </>
  );
}

function MyEventCard({ event, onView, onQR, onCalendar }) {
  const dateObj = event.dateObj;
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();

  return (
    <div style={{
      background: '#1e293b',
      border: '1px solid #334155',
      borderLeft: `3px solid ${event.color}`,
      borderRadius: 12,
      padding: '14px',
      marginBottom: 10,
      animation: 'pageIn 0.3s ease both',
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        {/* Date block */}
        <div style={{
          background: '#0f172a',
          borderRadius: 10,
          padding: '8px 12px',
          textAlign: 'center',
          minWidth: 52,
          flexShrink: 0,
        }}>
          <div style={{
            fontSize: 22,
            fontWeight: 800,
            color: event.badgeText,
            fontFamily: "'Syne', sans-serif",
            lineHeight: 1,
          }}>
            {day}
          </div>
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 3, fontWeight: 600 }}>{month}</div>
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9', marginBottom: 4 }}>
            {event.title}
          </div>
          <div style={{ fontSize: 11, color: '#64748b' }}>
            {event.time} · {event.venue}
          </div>
          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 7, marginTop: 10 }}>
            <ActionBtn icon="ti-eye" label="View" onClick={onView} />
            <ActionBtn icon="ti-qrcode" label="QR" onClick={onQR} accent />
            <ActionBtn icon="ti-calendar-plus" label="Calendar" onClick={onCalendar} />
          </div>
        </div>

        {/* Registered badge */}
        <div style={{
          background: '#064e3b',
          color: '#6ee7b7',
          fontSize: 10,
          fontWeight: 600,
          padding: '3px 8px',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          flexShrink: 0,
        }}>
          <i className="ti ti-check" style={{ fontSize: 11 }} /> Registered
        </div>
      </div>
    </div>
  );
}

function ActionBtn({ icon, label, onClick, accent }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: accent ? '#312e81' : '#0f172a',
        border: `1px solid ${accent ? '#4f46e5' : '#334155'}`,
        color: accent ? '#a5b4fc' : '#94a3b8',
        borderRadius: 7,
        padding: '5px 10px',
        fontSize: 11,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        transition: 'all 0.12s',
      }}
    >
      <i className={`ti ${icon}`} style={{ fontSize: 12 }} />
      {label}
    </button>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: '#475569',
      fontWeight: 600,
      marginBottom: 10,
    }}>
      {children}
    </div>
  );
}

function EmptyState({ onBrowse }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <i className="ti ti-calendar-off" style={{ fontSize: 52, color: '#334155', display: 'block', marginBottom: 16 }} />
      <p style={{ color: '#64748b', fontSize: 15, fontWeight: 600, marginBottom: 6 }}>No registrations yet</p>
      <p style={{ color: '#475569', fontSize: 12, marginBottom: 20 }}>
        Browse events and register to see them here
      </p>
      <button
        onClick={onBrowse}
        style={{
          background: '#6366f1',
          border: 'none',
          color: '#fff',
          padding: '10px 24px',
          borderRadius: 10,
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Browse Events →
      </button>
    </div>
  );
}
