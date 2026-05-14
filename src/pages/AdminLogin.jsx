import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === 'admin@college.com' &&
      password === 'admin123'
    ) {

      localStorage.setItem('admin', 'true');

      navigate('/admin');

    } else {

      alert('Invalid Credentials');

    }
  };

  return (

    <div
  style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a, #1e293b)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  }}
>


  {/* Back Button */}
<button
  onClick={() => navigate('/')}
  style={{
    position: 'absolute',
    top: 30,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 12,
    border: '1px solid #334155',
    background: '#1e293b',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <i className="ti ti-arrow-left" />
</button>

      <div
        style={{
          width: '100%',
          maxWidth: 380,
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 20,
          padding: 30,
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        }}
      >

        {/* Logo */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            color: 'white',
          }}
        >
          <i className="ti ti-shield-lock"></i>
        </div>

        {/* Heading */}
        <h1
          style={{
            textAlign: 'center',
            color: '#f8fafc',
            fontSize: 28,
            fontWeight: 800,
            marginBottom: 8,
            fontFamily: "'Syne', sans-serif",
          }}
        >
          Admin Login
        </h1>

        <p
          style={{
            textAlign: 'center',
            color: '#64748b',
            fontSize: 13,
            marginBottom: 30,
          }}
        >
          Campus Event Management Panel
        </p>

        {/* Form */}
        <form onSubmit={handleLogin}>

          {/* Email */}
          <div style={{ marginBottom: 18 }}>

            <label
              style={{
                display: 'block',
                color: '#94a3b8',
                marginBottom: 8,
                fontSize: 13,
              }}
            >
              Admin Email
            </label>

            <input
              type='email'
              placeholder='Enter admin email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: 12,
                border: '1px solid #334155',
                background: '#0f172a',
                color: '#f8fafc',
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />

          </div>

          {/* Password */}
          <div style={{ marginBottom: 24 }}>

            <label
              style={{
                display: 'block',
                color: '#94a3b8',
                marginBottom: 8,
                fontSize: 13,
              }}
            >
              Password
            </label>

            <input
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: 12,
                border: '1px solid #334155',
                background: '#0f172a',
                color: '#f8fafc',
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />

          </div>

          {/* Login Button */}
          <button
            type='submit'
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 12,
              border: 'none',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              transition: '0.2s',
            }}
          >
            Login to Dashboard
          </button>

        </form>

        {/* Footer */}
        <p
          style={{
            textAlign: 'center',
            color: '#475569',
            fontSize: 12,
            marginTop: 20,
          }}
        >
          Campus Event Companion App
        </p>

      </div>

    </div>
  );
}