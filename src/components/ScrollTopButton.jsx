import React from 'react';

export default function ScrollTopButton() {

  const scrollToTop = () => {

    const scrollContainer = document.querySelector(
      '[style*="overflow-y: auto"]'
    );

    if (scrollContainer) {

      scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (

    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: 90,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: '50%',
        border: '1px solid #334155',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        color: 'white',
        cursor: 'pointer',
        zIndex: 999,
        boxShadow: '0 10px 25px rgba(0,0,0,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: '0.25s',
      }}

      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}

      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >

      <i
        className="ti ti-arrow-up"
        style={{
          fontSize: 24,
        }}
      />

    </button>
  );
}