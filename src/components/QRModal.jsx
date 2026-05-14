import React, { useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { STUDENT } from '../data/events';

export default function QRModal({ event, onClose }) {
  const overlayRef = useRef(null);

  const qrData = JSON.stringify({
    token: `${STUDENT.rollNo}-EV${event.id}-${Date.now()}`,
    student: STUDENT.rollNo,
    studentName: STUDENT.name,
    eventId: event.id,
    eventTitle: event.title,
    date: event.date,
    venue: event.venue,
  });

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 200,
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div style={{
        background: '#1e293b',
        borderRadius: '20px 20px 0 0',
        padding: '24px 20px 32px',
        width: '100%',
        maxWidth: 480,
        animation: 'slideUp 0.3s ease',
        borderTop: '1px solid #334155',
      }}>
        {/* Handle */}
        <div style={{
          width: 36,
          height: 4,
          background: '#475569',
          borderRadius: 2,
          margin: '0 auto 20px',
        }} />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Syne', sans-serif", color: '#f1f5f9' }}>
              Attendance QR
            </h2>
            <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Show to coordinator for check-in</p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#334155',
              border: 'none',
              color: '#94a3b8',
              width: 34,
              height: 34,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 16,
            }}
          >
            <i className="ti ti-x" />
          </button>
        </div>

        {/* QR Code */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div style={{
            background: '#ffffff',
            padding: 18,
            borderRadius: 16,
            display: 'inline-block',
          }}>
            <QRCodeSVG
              value={qrData}
              size={200}
              level="H"
              includeMargin={false}
              bgColor="#ffffff"
              fgColor="#0f172a"
            />
          </div>
        </div>

        {/* Event Info */}
        <div style={{
          background: '#0f172a',
          border: '1px solid #334155',
          borderRadius: 12,
          padding: '14px 16px',
          marginBottom: 14,
        }}>
          {[
            ['Event', event.title],
            ['Date', event.date],
            ['Venue', event.venue],
            ['Student', STUDENT.name],
            ['Roll No', STUDENT.rollNo],
            ['Status', '✓ Verified'],
          ].map(([label, value]) => (
            <div key={label} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '6px 0',
              borderBottom: '1px solid #1e293b',
              fontSize: 12,
            }}>
              <span style={{ color: '#64748b' }}>{label}</span>
              <span style={{
                color: label === 'Status' ? '#10b981' : '#f1f5f9',
                fontWeight: 500,
                textAlign: 'right',
                maxWidth: '60%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Security badge */}
        <div style={{
          background: '#0f172a',
          border: '1px solid #064e3b',
          borderRadius: 10,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <i className="ti ti-shield-check" style={{ fontSize: 20, color: '#10b981', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#6ee7b7' }}>Secure Verified Pass</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>Single-use · Expires after scan</div>
          </div>
        </div>
      </div>
    </div>
  );
}
