import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginSelect() {

  return (

    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >

      <div
        style={{
          width: '100%',
          maxWidth: 400,
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 24,
          padding: 30,
        }}
      >

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 35 }}>

          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 34,
            }}
          >
            <i className="ti ti-building-community" />
          </div>

          <h1
            style={{
              color: 'white',
              fontSize: 30,
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            Campus Connect
          </h1>

          <p
            style={{
              color: '#94a3b8',
              fontSize: 14,
            }}
          >
            Smart Campus Event Management
          </p>

        </div>

        {/* Student Panel */}
        <Link
          to="/student-login"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#0f172a',
            border: '1px solid #334155',
            borderRadius: 18,
            padding: 20,
            textDecoration: 'none',
            color: 'white',
            marginBottom: 18,
          }}
        >

          <div style={{ display: 'flex', gap: 14 }}>

            <div
              style={{
                width: 55,
                height: 55,
                borderRadius: 14,
                background: 'rgba(99,102,241,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#818cf8',
                fontSize: 24,
              }}
            >
              <i className="ti ti-user" />
            </div>

            <div>

              <div
                style={{
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                Student Panel
              </div>

              <div
                style={{
                  color: '#94a3b8',
                  fontSize: 12,
                }}
              >
                Events, registrations & updates
              </div>

            </div>

          </div>

          <i className="ti ti-chevron-right" />

        </Link>

        {/* Admin Panel */}
        <Link
          to="/admin-login"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#0f172a',
            border: '1px solid #334155',
            borderRadius: 18,
            padding: 20,
            textDecoration: 'none',
            color: 'white',
          }}
        >

          <div style={{ display: 'flex', gap: 14 }}>

            <div
              style={{
                width: 55,
                height: 55,
                borderRadius: 14,
                background: 'rgba(34,197,94,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#22c55e',
                fontSize: 24,
              }}
            >
              <i className="ti ti-shield-lock" />
            </div>

            <div>

              <div
                style={{
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                Admin Panel
              </div>

              <div
                style={{
                  color: '#94a3b8',
                  fontSize: 12,
                }}
              >
                Manage events & attendance
              </div>

            </div>

          </div>

          <i className="ti ti-chevron-right" />

        </Link>

      </div>

    </div>
  );
}