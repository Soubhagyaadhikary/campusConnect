import React, { useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function QRScanner() {

  const scannerRef = useRef(null);

  const [isScanning, setIsScanning] = useState(false);

  // START SCANNER
  const startScanner = () => {

    if (isScanning) return;

    const scanner = new Html5QrcodeScanner(
      'reader',
      {
        fps: 10,
        qrbox: 250,
      }
    );

    scanner.render(success, error);

    scannerRef.current = scanner;

    setIsScanning(true);
  };

  // STOP SCANNER
  const stopScanner = async () => {

    if (scannerRef.current) {

      await scannerRef.current.clear();

      scannerRef.current = null;

      setIsScanning(false);
    }
  };

  // TOGGLE SWITCH
  const toggleScanner = () => {

    if (isScanning) {
      stopScanner();
    } else {
      startScanner();
    }
  };

  // SUCCESS
  const success = (decodedText) => {

    console.log(decodedText);

    alert('Attendance Marked Successfully');
  };

  // ERROR
  const error = () => {};

  return (

    <div>

      {/* Header Card */}
      <div
        style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 18,
          padding: 20,
          marginBottom: 20,
        }}
      >

        {/* Top Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >

          <div>

            <h2
              style={{
                color: 'white',
                fontSize: 22,
                fontWeight: 800,
                marginBottom: 6,
              }}
            >
              QR Attendance Scanner
            </h2>

            <p
              style={{
                color: '#64748b',
                fontSize: 13,
              }}
            >
              Scan student attendance QR codes
            </p>

          </div>

          {/* Status Badge */}
          <div
            style={{
              background: isScanning
                ? 'rgba(34,197,94,0.15)'
                : 'rgba(239,68,68,0.15)',

              color: isScanning
                ? '#22c55e'
                : '#ef4444',

              padding: '8px 14px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {isScanning ? 'ACTIVE' : 'OFFLINE'}
          </div>

        </div>

        {/* Toggle Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#0f172a',
            border: '1px solid #334155',
            borderRadius: 16,
            padding: '16px 18px',
          }}
        >

          <div>

            <div
              style={{
                color: 'white',
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              Start Scanner
            </div>

            <div
              style={{
                color: '#64748b',
                fontSize: 12,
              }}
            >
              Enable camera QR scanning
            </div>

          </div>

          {/* Professional Switch */}
          <div
            onClick={toggleScanner}
            style={{
              width: 70,
              height: 38,
              borderRadius: 999,
              background: isScanning
                ? '#22c55e'
                : '#334155',

              position: 'relative',
              cursor: 'pointer',
              transition: '0.25s',
            }}
          >

            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: 'white',
                position: 'absolute',
                top: 4,
                left: isScanning ? 36 : 4,
                transition: '0.25s',
                boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
              }}
            />

          </div>

        </div>

      </div>

      {/* Upload Card */}
      <div
        style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 18,
          padding: 20,
          marginBottom: 20,
        }}
      >

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 16,
          }}
        >

          <i
            className="ti ti-upload"
            style={{
              color: '#818cf8',
              fontSize: 22,
            }}
          />

          <div>

            <div
              style={{
                color: 'white',
                fontWeight: 700,
              }}
            >
              Upload QR Image
            </div>

            <div
              style={{
                color: '#64748b',
                fontSize: 12,
              }}
            >
              Scan QR from screenshot or gallery
            </div>

          </div>

        </div>

        <input
          type="file"
          accept="image/*"
          style={{
            width: '100%',
            padding: 12,
            borderRadius: 12,
            background: '#0f172a',
            border: '1px solid #334155',
            color: 'white',
            boxSizing: 'border-box',
          }}
        />

      </div>

      {/* Scanner Box */}
      <div
        style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 18,
          padding: 16,
        }}
      >

        <div
          style={{
            color: 'white',
            fontWeight: 700,
            marginBottom: 14,
          }}
        >
          Live Scanner
        </div>

        <div
          id="reader"
          style={{
            borderRadius: 14,
            overflow: 'hidden',
          }}
        ></div>

      </div>

    </div>
  );
}