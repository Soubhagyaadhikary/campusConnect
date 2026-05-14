import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentLogin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // LOGIN FUNCTION
  const handleLogin = (e) => {

    e.preventDefault();

    if (
      email === 'student@college.com' &&
      password === 'student123'
    ) {

      localStorage.setItem('student', 'true');

      navigate('/student-home');

    } else {

      alert('Invalid Student Credentials');
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

      {/* Login Card */}
      <div
        style={{
          width: '100%',
          maxWidth: 380,
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 24,
          padding: 30,
        }}
      >

        <h1
          style={{
            color: 'white',
            fontSize: 30,
            fontWeight: 800,
            marginBottom: 10,
          }}
        >
          Student Login
        </h1>

        <p
          style={{
            color: '#94a3b8',
            marginBottom: 30,
          }}
        >
          Access your campus dashboard
        </p>

        {/* Demo Credentials */}
        <div
          style={{
            background: '#0f172a',
            border: '1px solid #334155',
            borderRadius: 12,
            padding: 14,
            marginBottom: 22,
          }}
        >

          <div
            style={{
              color: '#818cf8',
              fontWeight: 700,
              marginBottom: 8,
              fontSize: 13,
            }}
          >
            Demo Credentials
          </div>

          <div
            style={{
              color: '#94a3b8',
              fontSize: 12,
              lineHeight: 1.8,
            }}
          >
            Email: student@college.com
            <br />
            Password: student123
          </div>

        </div>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Student Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: 14,
              borderRadius: 12,
              border: '1px solid #334155',
              background: '#0f172a',
              color: 'white',
              marginBottom: 16,
              boxSizing: 'border-box',
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: 14,
              borderRadius: 12,
              border: '1px solid #334155',
              background: '#0f172a',
              color: 'white',
              marginBottom: 22,
              boxSizing: 'border-box',
            }}
          />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: 14,
              border: 'none',
              borderRadius: 12,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Login as Student
          </button>

          <button
  onClick={() => navigate('/student-register')}
  type="button"
  style={{
    width: '100%',
    padding: 14,
    borderRadius: 12,
    border: '1px solid #334155',
    background: '#111827',
    color: 'white',
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: 14,
  }}
>
  Create New Account
</button>

        </form>

      </div>

    </div>
  );
}