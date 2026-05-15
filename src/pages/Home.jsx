import React, {
  useState,
  useMemo,
  useEffect,
} from 'react';
import { useApp } from '../context/AppContext';
import { EVENTS, STUDENT } from '../data/events';
import EventCard from '../components/EventCard';
import { supabase } from '../supabaseClient';

const CATEGORIES = ['All', 'Workshop', 'Hackathon', 'Cultural', 'Placement', 'Seminar', 'Club'];

export default function Home() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState(EVENTS);
  const { registered, unreadCount } = useApp();
  useEffect(() => {

  fetchEvents();

}, []);

const fetchEvents = async () => {

  const { data, error } =
    await supabase
      .from('events')
      .select('*')
      .order('created_at', {
        ascending: false,
      });

  if (!error) {

    setEvents([...data, ...EVENTS]);
  }
};

  const filtered = useMemo(() => {
    return events.filter((ev) => {
      const matchCat = filter === 'All' || ev.category === filter;
      const matchSearch =
        !search ||
        ev.title.toLowerCase().includes(search.toLowerCase()) ||
        ev.category.toLowerCase().includes(search.toLowerCase()) ||
        ev.host.toLowerCase().includes(search.toLowerCase()) ||
        ev.venue.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [filter, search]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top Bar */}
      <div style={{
        background: '#1e293b',
        padding: '16px 16px 14px',
        borderBottom: '1px solid #334155',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 22,
              fontWeight: 800,
              color: '#f1f5f9',
              letterSpacing: '-0.01em',
            }}>
              🎓 CampusEvent
            </h1>
            <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
              Good morning, {STUDENT.name.split(' ')[0]} 👋
            </p>
          </div>
        </div>

        {/* Search */}
        <div style={{
          background: '#0f172a',
          border: '1px solid #334155',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '9px 14px',
        }}>
          <i className="ti ti-search" style={{ fontSize: 16, color: '#475569', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search events, clubs, workshops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: 'none',
              border: 'none',
              color: '#f1f5f9',
              flex: 1,
              fontSize: 13,
              outline: 'none',
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: 16 }}
            >
              <i className="ti ti-x" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Pills */}
      <div style={{
        display: 'flex',
        gap: 8,
        padding: '12px 16px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        background: '#1e293b',
        flexShrink: 0,
      }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              background: filter === cat ? '#6366f1' : '#0f172a',
              border: `1px solid ${filter === cat ? '#6366f1' : '#334155'}`,
              borderRadius: 20,
              padding: '5px 14px',
              fontSize: 12,
              fontWeight: 500,
              color: filter === cat ? '#fff' : '#94a3b8',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Scrollable Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 16px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          <StatCard num={events.length} label="Events this month" color="#818cf8" />
          <StatCard num={registered.size} label="You're registered" color="#10b981" />
        </div>

        {/* Section label */}
        <div style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#475569',
          fontWeight: 600,
          marginBottom: 10,
        }}>
          {filter === 'All' ? 'All Upcoming Events' : `${filter} Events`}
          {search && ` · "${search}"`}
          <span style={{ color: '#6366f1', marginLeft: 6 }}>({filtered.length})</span>
        </div>

        {/* Event list */}
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          filtered.map((ev, i) => (
            <div
              key={ev.id}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <EventCard event={ev} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function StatCard({ num, label, color }) {
  return (
    <div style={{
      background: '#1e293b',
      border: '1px solid #334155',
      borderRadius: 12,
      padding: '12px 14px',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: 26,
        fontWeight: 800,
        color,
        fontFamily: "'Syne', sans-serif",
        lineHeight: 1,
      }}>
        {num}
      </div>
      <div style={{ fontSize: 11, color: '#64748b', marginTop: 5 }}>{label}</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{ textAlign: 'center', padding: '50px 20px' }}>
      <i className="ti ti-calendar-off" style={{ fontSize: 48, color: '#334155', display: 'block', marginBottom: 14 }} />
      <p style={{ color: '#475569', fontSize: 14, fontWeight: 500 }}>No events found</p>
      <p style={{ color: '#334155', fontSize: 12, marginTop: 4 }}>Try a different filter or search term</p>
    </div>
  );
}
