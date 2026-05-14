import React from 'react';
import PageHeader from '../components/PageHeader';

export default function Organizers() {

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0f172a',
        color: 'white',
        padding: 20,
      }}
    >

      <PageHeader
        title="Organizers"
        subtitle="Manage club organizers"
      />

      <div
        style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 14,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <h3>Robotics Club</h3>

        <p style={{ color: '#94a3b8' }}>
          Verified Organizer
        </p>

        <button
          style={{
            marginTop: 10,
            padding: '8px 14px',
            background: '#22c55e',
            border: 'none',
            borderRadius: 8,
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Approve
        </button>
      </div>

    </div>
  );
}