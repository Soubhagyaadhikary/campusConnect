import React from 'react';
import { Link } from 'react-router-dom';
import { STUDENT, EVENTS } from '../data/events';
import { useApp } from '../context/AppContext';

const MENU = [
  { icon: 'ti-user', label: 'Edit Profile', desc: 'Update your info' },
  { icon: 'ti-bell', label: 'Notification Settings', desc: 'Manage alerts & reminders' },
  { icon: 'ti-calendar', label: 'Sync Google Calendar', desc: 'Connect your calendar' },
  { icon: 'ti-category', label: 'Interests & Departments', desc: 'Personalize event feed' },
  { icon: 'ti-certificate', label: 'My Certificates', desc: 'Download event certificates' },
  { icon: 'ti-shield-check', label: 'Privacy & Security', desc: 'Account settings' },
];

export default function Profile() {
  const student = JSON.parse(
  localStorage.getItem('studentProfile')
);
  const { registered, addToast } = useApp();

  const handleMenu = (label) => {
    addToast(`${label} — coming soon!`, 'info');
  };

  const handleStudentLogout = () => {

  localStorage.removeItem('student');

  window.location.href = '/';
};

  const categoryBreakdown = EVENTS
    .filter((e) => registered.has(e.id))
    .reduce((acc, ev) => {
      acc[ev.category] = (acc[ev.category] || 0) + 1;
      return acc;
    }, {});

  return (
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
          Profile
        </h1>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Hero */}
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          padding: '24px 16px 20px',
          borderBottom: '1px solid #334155',
          textAlign: 'center',
        }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
            fontWeight: 800,
            color: '#fff',
            fontFamily: "'Syne', sans-serif",
            margin: '0 auto 12px',
            border: '3px solid #6366f1',
          }}>
            {student?.name?.charAt(0)}
          </div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 18,
            fontWeight: 800,
            color: '#f1f5f9',
            marginBottom: 4,
          }}>
            {student?.name}
          </h2>
          <p style={{ color: '#64748b', fontSize: 12 }}>
            {student?.branch} · {STUDENT.year}
          </p>
          <p style={{ color: '#475569', fontSize: 11, marginTop: 3 }}>
            Roll No: {student?.roll}
          </p>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 1,
            background: '#334155',
            borderRadius: 12,
            overflow: 'hidden',
            marginTop: 18,
          }}>
            {[
              { n: registered.size, l: 'Registered' },
              { n: STUDENT.eventsAttended, l: 'Attended' },
              { n: `${STUDENT.attendanceRate}%`, l: 'Rate' },
            ].map(({ n, l }) => (
              <div key={l} style={{
                background: '#1e293b',
                padding: '12px 8px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#818cf8',
                  fontFamily: "'Syne', sans-serif",
                }}>
                  {n}
                </div>
                <div style={{ fontSize: 10, color: '#64748b', marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Category breakdown */}
        {Object.keys(categoryBreakdown).length > 0 && (
          <div style={{ padding: '16px 16px 0' }}>
            <SectionLabel>Your interest categories</SectionLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 4 }}>
              {Object.entries(categoryBreakdown).map(([cat, count]) => (
                <span key={cat} style={{
                  background: '#1e293b',
                  border: '1px solid #334155',
                  color: '#94a3b8',
                  fontSize: 11,
                  padding: '4px 10px',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}>
                  {cat}
                  <span style={{
                    background: '#312e81',
                    color: '#a5b4fc',
                    padding: '1px 6px',
                    borderRadius: 6,
                    fontSize: 10,
                    fontWeight: 600,
                  }}>
                    {count}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact info */}
        <div style={{ padding: '16px 16px 0' }}>
          <SectionLabel>Contact Info</SectionLabel>
          <div style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: 12,
            overflow: 'hidden',
            marginBottom: 16,
          }}>
            {[
              {
  icon: 'ti-mail',
  label: 'Email',
  value: 'student@campusconnect.com',
},
{
  icon: 'ti-phone',
  label: 'Phone',
  value: student?.phone,
},
            ].map(({ icon, label, value }, i) => (
              <div key={label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '13px 14px',
                borderBottom: i === 0 ? '1px solid #334155' : 'none',
              }}>
                <i className={`ti ${icon}`} style={{ fontSize: 16, color: '#475569' }} />
                <div>
                  <div style={{ fontSize: 10, color: '#475569', marginBottom: 1 }}>{label}</div>
                  <div style={{ fontSize: 13, color: '#94a3b8' }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div style={{ padding: '0 16px' }}>
          <SectionLabel>Settings</SectionLabel>
          <div style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: 12,
            overflow: 'hidden',
            marginBottom: 16,
          }}>
            {MENU.map(({ icon, label, desc }, i) => (
              <div
                key={label}
                onClick={() => handleMenu(label)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '13px 14px',
                  borderBottom: i < MENU.length - 1 ? '1px solid #334155' : 'none',
                  cursor: 'pointer',
                  transition: 'background 0.12s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#253047')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{
                  width: 36,
                  height: 36,
                  background: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: 9,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <i className={`ti ${icon}`} style={{ fontSize: 16, color: '#64748b' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#f1f5f9' }}>{label}</div>
                  <div style={{ fontSize: 11, color: '#475569', marginTop: 1 }}>{desc}</div>
                </div>
                <i className="ti ti-chevron-right" style={{ fontSize: 16, color: '#334155' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Admin Login */}
<div style={{ padding: '0 16px 16px' }}>

  <Link
    to="/admin-login"
    style={{
      width: '100%',
      background: '#6366f1',
      border: '1px solid #818cf8',
      color: '#fff',
      borderRadius: 12,
      padding: '13px 0',
      fontSize: 14,
      fontWeight: 600,
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      fontFamily: "'DM Sans', sans-serif",
    }}
  >
    <i className="ti ti-shield-lock" style={{ fontSize: 16 }} />
    Admin Login
  </Link>

</div>

        {/* Logout */}
        <div style={{ padding: '0 16px 24px' }}>
          <button
            onClick={handleStudentLogout}
            style={{
              width: '100%',
              background: '#1e293b',
              border: '1px solid #7f1d1d',
              color: '#ef4444',
              borderRadius: 12,
              padding: '13px 0',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <i className="ti ti-logout" style={{ fontSize: 16 }} />
            Logout
          </button>
        </div>
      </div>
    </div>
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
