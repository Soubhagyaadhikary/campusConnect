import React from 'react';
import PageHeader from '../components/PageHeader';

export default function Reports() {

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
        title="Reports"
        subtitle="Flagged events and misconduct"
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
        <h3>Fake Event Report</h3>

        <p style={{ color: '#94a3b8' }}>
          Students reported spam hackathon registration.
        </p>

        <button
          style={{
            marginTop: 10,
            padding: '8px 14px',
            background: '#ef4444',
            border: 'none',
            borderRadius: 8,
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Remove Event
        </button>
      </div>

    </div>
  );
}