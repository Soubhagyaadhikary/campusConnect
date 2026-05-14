import React from 'react';
import { useApp } from '../context/AppContext';

const ICON_MAP = {
  success: { icon: 'ti-circle-check', color: '#10b981' },
  info:    { icon: 'ti-info-circle',  color: '#818cf8' },
  error:   { icon: 'ti-alert-circle', color: '#ef4444' },
};

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div style={{
      position: 'fixed',
      bottom: 82,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      alignItems: 'center',
      width: '100%',
      maxWidth: 480,
      pointerEvents: 'none',
    }}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}

function Toast({ toast, onRemove }) {
  const { icon, color } = ICON_MAP[toast.type] || ICON_MAP.success;

  return (
    <div
      onClick={() => onRemove(toast.id)}
      style={{
        background: '#1e293b',
        border: `1px solid ${color}44`,
        borderLeft: `3px solid ${color}`,
        color: '#f1f5f9',
        padding: '10px 16px',
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        animation: 'toastIn 0.3s ease',
        pointerEvents: 'all',
        cursor: 'pointer',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        whiteSpace: 'nowrap',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <i className={`ti ${icon}`} style={{ fontSize: 16, color }} />
      {toast.message}
    </div>
  );
}
