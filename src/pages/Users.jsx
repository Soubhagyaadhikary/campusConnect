import React from 'react';
import PageHeader from '../components/PageHeader';

export default function Users() {

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
        title="Users Management"
        subtitle="Manage student accounts"
      />

      <div
        style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 16,
          padding: 20,
        }}
      >

        <h3>Total Students</h3>

        <p
          style={{
            color: '#94a3b8',
            marginTop: 8,
          }}
        >
          2,540 Active Students
        </p>

      </div>

    </div>
  );
}