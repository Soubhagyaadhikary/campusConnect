import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

export default function NotificationsAdmin() {

  const [message, setMessage] = useState('');

  const handleSend = () => {
    alert('Notification Sent Successfully');
    setMessage('');
  };

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
        title="Notifications"
        subtitle="Send announcements to students"
      />

      <div
        style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 14,
          padding: 20,
        }}
      >

        <textarea
          placeholder='Write announcement here...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: '100%',
            height: 150,
            background: '#0f172a',
            border: '1px solid #334155',
            borderRadius: 10,
            padding: 12,
            color: 'white',
            resize: 'none',
            marginBottom: 16,
            boxSizing: 'border-box',
          }}
        />

        <button
          onClick={handleSend}
          style={{
            width: '100%',
            padding: 14,
            background: '#6366f1',
            border: 'none',
            borderRadius: 10,
            color: 'white',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Send Notification
        </button>

      </div>

    </div>
  );
}