import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PageHeader from '../components/PageHeader';

export default function CreateEvent() {

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: uuidv4(),
      title,
      date,
    };

    console.log(newEvent);

    alert('Event Created Successfully');
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
        title="Create Event"
        subtitle="Publish new campus events"
      />

      <form onSubmit={handleSubmit}>

        <input
          type='text'
          placeholder='Event Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: '100%',
            padding: 14,
            marginBottom: 16,
            borderRadius: 12,
            border: '1px solid #334155',
            background: '#1e293b',
            color: 'white',
            boxSizing: 'border-box',
          }}
        />

        <input
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            width: '100%',
            padding: 14,
            marginBottom: 16,
            borderRadius: 12,
            border: '1px solid #334155',
            background: '#1e293b',
            color: 'white',
            boxSizing: 'border-box',
          }}
        />

        <button
          type='submit'
          style={{
            width: '100%',
            padding: 14,
            borderRadius: 12,
            border: 'none',
            background: '#6366f1',
            color: 'white',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Create Event
        </button>

      </form>

    </div>
  );
}