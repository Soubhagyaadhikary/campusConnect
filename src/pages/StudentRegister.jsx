import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const skills = [
  'JavaScript',
  'Python',
  'UI/UX Design',
  'Machine Learning',
  'Robotics',
  'Cloud Computing',
  'Cybersecurity',
  'App Development',
];

export default function StudentRegister() {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    phone: '',
    branch: 'CSE',
    interests: [],
  });

  const toggleInterest = (skill) => {

    setFormData((prev) => {

      const exists =
        prev.interests.includes(skill);

      return {
        ...prev,

        interests: exists
          ? prev.interests.filter(
              (s) => s !== skill
            )
          : [...prev.interests, skill],
      };
    });
  };

  const handleComplete = () => {

    localStorage.setItem(
      'studentProfile',
      JSON.stringify(formData)
    );

    localStorage.setItem(
      'student',
      'true'
    );

    navigate('/student-home');
  };

  return (

    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #070b2d, #0f172a)',
        padding: 24,
        color: 'white',
      }}
    >

      {/* Back */}
      <button
        onClick={() => {

          if (step === 1) {
            navigate('/student-login');
          } else {
            setStep(1);
          }
        }}
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          border: '1px solid #334155',
          background: '#111827',
          color: 'white',
          cursor: 'pointer',
          marginBottom: 30,
        }}
      >
        ←
      </button>

      {/* STEP 1 */}
      {step === 1 && (

        <div>

          <h1
            style={{
              fontSize: 34,
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            Create Your Profile
          </h1>

          <p
            style={{
              color: '#94a3b8',
              marginBottom: 30,
            }}
          >
            Tell us a bit about yourself
          </p>

          <Input
            label="FULL NAME"
            placeholder="Alex Smith"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          <Input
            label="ROLL NUMBER"
            placeholder="2026CS104"
            value={formData.roll}
            onChange={(e) =>
              setFormData({
                ...formData,
                roll: e.target.value,
              })
            }
          />

          <Input
            label="PHONE NUMBER"
            placeholder="+91XXXXXXXXXX"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value,
              })
            }
          />

          {/* Branch */}
          <div style={{ marginBottom: 24 }}>

            <label
              style={{
                color: '#8b5cf6',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              BRANCH
            </label>

            <select
              value={formData.branch}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  branch: e.target.value,
                })
              }
              style={{
                width: '100%',
                marginTop: 10,
                padding: 16,
                borderRadius: 16,
                background: '#1e293b',
                border: '1px solid #334155',
                color: 'white',
              }}
            >
              <option>CSE</option>
              <option>EE</option>
              <option>ME</option>
              <option>CE</option>
            </select>

          </div>

          {/* Upload */}
          <div
            style={{
              border: '2px dashed #334155',
              borderRadius: 20,
              padding: 40,
              textAlign: 'center',
              marginBottom: 28,
              background: '#111827',
            }}
          >

            <div
              style={{
                fontSize: 40,
                marginBottom: 12,
              }}
            >
              ☁
            </div>

            <p
              style={{
                color: '#94a3b8',
              }}
            >
              Upload College ID
            </p>

            <input
              type="file"
              style={{
                marginTop: 16,
                color: 'white',
              }}
            />

          </div>

          <button
            onClick={() => setStep(2)}
            style={primaryBtn}
          >
            Next Step →
          </button>

        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (

        <div>

          <h1
            style={{
              fontSize: 34,
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            Interests & Goals
          </h1>

          <p
            style={{
              color: '#94a3b8',
              marginBottom: 30,
            }}
          >
            Help us personalize your feed
          </p>

          <h3
            style={{
              marginBottom: 16,
            }}
          >
            Select Skills
          </h3>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              marginBottom: 40,
            }}
          >

            {skills.map((skill) => {

              const active =
                formData.interests.includes(skill);

              return (

                <button
                  key={skill}
                  onClick={() =>
                    toggleInterest(skill)
                  }
                  style={{
                    padding: '12px 18px',
                    borderRadius: 999,
                    border: active
                      ? '1px solid #8b5cf6'
                      : '1px solid #334155',

                    background: active
                      ? '#7c3aed'
                      : '#111827',

                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  {skill}
                </button>
              );
            })}

          </div>

          <div
            style={{
              display: 'flex',
              gap: 14,
            }}
          >

            <button
              onClick={() => setStep(1)}
              style={{
                ...secondaryBtn,
                flex: 1,
              }}
            >
              Back
            </button>

            <button
              onClick={handleComplete}
              style={{
                ...primaryBtn,
                flex: 1,
              }}
            >
              Complete ✓
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

function Input({
  label,
  placeholder,
  value,
  onChange,
}) {

  return (

    <div style={{ marginBottom: 24 }}>

      <label
        style={{
          color: '#8b5cf6',
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        {label}
      </label>

      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          marginTop: 10,
          padding: 16,
          borderRadius: 16,
          background: '#1e293b',
          border: '1px solid #334155',
          color: 'white',
          boxSizing: 'border-box',
        }}
      />

    </div>
  );
}

const primaryBtn = {
  background:
    'linear-gradient(135deg, #7c3aed, #d946ef)',

  color: 'white',
  border: 'none',
  padding: '16px 24px',
  borderRadius: 16,
  fontWeight: 700,
  cursor: 'pointer',
};

const secondaryBtn = {
  background: '#111827',
  color: '#ef4444',
  border: '1px solid #7f1d1d',
  padding: '16px 24px',
  borderRadius: 16,
  fontWeight: 700,
  cursor: 'pointer',
};