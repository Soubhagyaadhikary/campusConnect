import React from 'react';
import { Link } from 'react-router-dom';

const CARD_STYLE = {
  background: '#1e293b',
  border: '1px solid #334155',
  borderRadius: 16,
  padding: 20,
  color: 'white',
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  transition: 'all 0.25s ease',
transform: 'translateY(0)',
};

export default function AdminDashboard() {

  const handleLogout = () => {
    localStorage.removeItem('admin');
    window.location.href = '/admin-login';
  };

  return (

    <div
      style={{
        minHeight: '100vh',
        background: '#0f172a',
        padding: 20,
        color: 'white',
      }}
    >

      {/* Heading */}
      <div style={{ marginBottom: 30 }}>
        <h1
          style={{
            fontSize: 30,
            fontWeight: 800,
            marginBottom: 6,
          }}
        >
          Admin Dashboard
        </h1>

        <p style={{ color: '#64748b' }}>
          Campus Event Management System
        </p>
      </div>

      {/* Analytics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginBottom: 30,
        }}
      >

        <StatCard title="Total Students" value="2540" />
        <StatCard title="Active Events" value="32" />
        <StatCard title="Attendance Rate" value="89%" />
        <StatCard title="Pending Approvals" value="12" />

      </div>

      {/* Main Menu */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
        }}
      >

        <DashboardLink
          to="/users"
          title="Users"
          desc="Students & participation"
          icon="ti-users"
        />

        <DashboardLink
          to="/organizers"
          title="Organizers"
          desc="Approve clubs & organizers"
          icon="ti-shield-check"
        />

        <DashboardLink
          to="/create-event"
          title="Create Event"
          desc="Create & manage events"
          icon="ti-calendar-plus"
        />

        <DashboardLink
          to="/attendance"
          title="Attendance"
          desc="QR attendance analytics"
          icon="ti-qrcode"
        />

        <DashboardLink
          to="/notifications-admin"
          title="Notifications"
          desc="Send announcements"
          icon="ti-bell"
        />

        <DashboardLink
          to="/reports"
          title="Reports"
          desc="Flagged events & issues"
          icon="ti-flag"
        />

      </div>
      {/* Extra Analytics Section */}
<div
  style={{
    marginTop: 30,
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: 18,
    padding: 20,
  }}
>

  <h2
    style={{
      color: 'white',
      marginBottom: 18,
    }}
  >
    Engagement Analytics
  </h2>

  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    }}
  >

    <AnalyticsRow
      label="CSE Participation"
      value="91%"
    />

    <AnalyticsRow
      label="Mechanical Attendance"
      value="78%"
    />

    <AnalyticsRow
      label="Hackathon Growth"
      value="+34%"
    />

    <AnalyticsRow
      label="Most Active Club"
      value="Robotics Club"
    />

  </div>

</div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={{
          marginTop: 30,
          width: '100%',
          padding: 14,
          borderRadius: 14,
          border: '1px solid #7f1d1d',
          background: '#1e293b',
          color: '#ef4444',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        Logout
      </button>

    </div>
  );
}

function DashboardLink({ to, title, desc, icon }) {

  return (
    <Link
  to={to}
  style={CARD_STYLE}

  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.borderColor = '#6366f1';
  }}

  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.borderColor = '#334155';
  }}
>

      <i
        className={`ti ${icon}`}
        style={{
          fontSize: 28,
          color: '#818cf8',
        }}
      />

      <div
        style={{
          fontSize: 17,
          fontWeight: 700,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 12,
          color: '#94a3b8',
        }}
      >
        {desc}
      </div>

    </Link>
  );
}

function StatCard({ title, value }) {

  return (
    <div
      style={{
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: 16,
        padding: 18,
      }}
    >

      <div
        style={{
          color: '#64748b',
          fontSize: 12,
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: '#818cf8',
        }}
      >
        {value}
      </div>

    </div>
  );
}

function AnalyticsRow({ label, value }) {

  return (
    <div
      style={{
        background: '#0f172a',
        border: '1px solid #334155',
        borderRadius: 12,
        padding: 14,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >

      <div
        style={{
          color: '#94a3b8',
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: '#818cf8',
          fontWeight: 700,
        }}
      >
        {value}
      </div>

    </div>
  );
}