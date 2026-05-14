import React from 'react';
import QRScanner from '../components/QRScanner';
import PageHeader from '../components/PageHeader';

export default function Attendance() {

  return (

    <div
      style={{
        minHeight: '100vh',
        background: '#0f172a',
        padding: 20,
      }}
    >

      <PageHeader
        title="Attendance Scanner"
        subtitle="QR based attendance system"
      />

      <QRScanner />

    </div>
  );
}