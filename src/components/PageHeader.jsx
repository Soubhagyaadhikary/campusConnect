import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PageHeader({ title, subtitle }) {

  const navigate = useNavigate();

  return (

    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(15,23,42,0.92)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #334155',
        padding: '16px 18px',
        marginBottom: 20,
      }}
    >

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            border: '1px solid #334155',
            background: '#1e293b',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: '0.2s',
            flexShrink: 0,
          }}
        >

          <i
            className="ti ti-arrow-left"
            style={{
              fontSize: 18,
            }}
          />

        </button>

        {/* Title */}
        <div>

          <h1
            style={{
              color: 'white',
              fontSize: 22,
              fontWeight: 800,
              marginBottom: 2,
            }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              style={{
                color: '#64748b',
                fontSize: 12,
              }}
            >
              {subtitle}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}