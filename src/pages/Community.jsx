import React from 'react';

const POSTS = [
  {
    id: 1,
    name: 'Rahul Sharma',
    branch: 'CSE',
    text:
      'Looking for teammates for upcoming AI Hackathon 🚀',
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    name: 'Ananya Roy',
    branch: 'EE',
    text:
      'Won 2nd prize in Robotics Workshop 🤖',
    likes: 42,
    comments: 12,
  },
  {
    id: 3,
    name: 'Arjun Das',
    branch: 'ME',
    text:
      'Anyone interested in startup networking event?',
    likes: 18,
    comments: 5,
  },
];

export default function Community() {

  return (

    <div
      style={{
        minHeight: '100vh',
        background: '#0f172a',
        padding: 16,
        color: 'white',
      }}
    >

      {/* Header */}

      <div
        style={{
          marginBottom: 24,
        }}
      >

        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            marginBottom: 6,
          }}
        >
          Campus Community
        </h1>

        <p
          style={{
            color: '#94a3b8',
            fontSize: 13,
          }}
        >
          Connect with students across campus
        </p>

      </div>

      {/* Create Post */}

      <div
        style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 18,
          padding: 16,
          marginBottom: 22,
        }}
      >

        <input
          placeholder="Share something with campus..."
          style={{
            width: '100%',
            padding: 14,
            borderRadius: 12,
            border: '1px solid #334155',
            background: '#0f172a',
            color: 'white',
            boxSizing: 'border-box',
          }}
        />

      </div>

      {/* Feed */}

      {POSTS.map((post) => (

        <div
          key={post.id}
          style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: 20,
            padding: 18,
            marginBottom: 18,
          }}
        >

          {/* Top */}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 14,
            }}
          >

            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg,#6366f1,#8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              {post.name[0]}
            </div>

            <div>

              <div
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                {post.name}
              </div>

              <div
                style={{
                  color: '#94a3b8',
                  fontSize: 12,
                }}
              >
                {post.branch}
              </div>

            </div>

          </div>

          {/* Content */}

          <p
            style={{
              color: '#e2e8f0',
              lineHeight: 1.6,
              marginBottom: 18,
            }}
          >
            {post.text}
          </p>

          {/* Footer */}

          <div
            style={{
              display: 'flex',
              gap: 20,
              color: '#94a3b8',
              fontSize: 13,
            }}
          >

            <div>❤️ {post.likes}</div>

            <div>💬 {post.comments}</div>

            <div>↗ Share</div>

          </div>

        </div>

      ))}

    </div>
  );
}