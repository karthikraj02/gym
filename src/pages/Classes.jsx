import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassCard, { defaultClasses } from '../components/ClassCard';
import { useAuth } from '../context/AuthContext';
import api from '../hooks/useApi';

const categories = ['All', 'Strength', 'Combat', 'Recovery', 'Cardio', 'Endurance', 'Functional', 'Aqua'];

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [message, setMessage] = useState('');
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/classes')
      .then(d => setClasses(d.data || d || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [classes, filter]);

  const handleBook = async (cls) => {
    if (!user) { navigate('/login'); return; }
    try {
      const id = cls._id || cls.id;
      if (id) {
        await api.post('/bookings', { classId: id }, token);
        setMessage(`✅ Booked ${cls.name || cls.title || 'class'} successfully!`);
      } else {
        setMessage('Class booking requires a running backend.');
      }
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
    setTimeout(() => setMessage(''), 4000);
  };

  const displayClasses = classes.length > 0 ? classes : defaultClasses;
  const filtered = filter === 'All'
    ? displayClasses
    : displayClasses.filter(c => (c.tag || c.category || '').toLowerCase() === filter.toLowerCase());

  return (
    <section className="classes-section" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
      <div className="classes-header reveal" style={{ flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <div className="section-label">Disciplines</div>
          <h2 className="section-title">All<br />Group Classes</h2>
        </div>
      </div>

      {/* Category filter */}
      <div className="reveal" style={{
        display: 'flex', gap: '0.75rem', flexWrap: 'wrap',
        maxWidth: '1400px', margin: '0 auto 2rem',
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              fontFamily: 'var(--font-head)',
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              padding: '0.5rem 1rem',
              border: `1px solid ${filter === cat ? 'var(--primary)' : 'var(--border)'}`,
              background: filter === cat ? 'rgba(0,245,255,0.1)' : 'transparent',
              color: filter === cat ? 'var(--primary)' : 'rgba(224,247,250,0.5)',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'all 0.3s',
              clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {message && (
        <div style={{
          maxWidth: '600px', margin: '0 auto 2rem', padding: '1rem',
          border: '1px solid var(--border)', background: 'var(--panel)',
          fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
          textAlign: 'center', color: 'var(--primary)', letterSpacing: '0.1em',
        }}>
          {message}
        </div>
      )}

      {loading ? (
        <div className="loader"><div className="spinner" /></div>
      ) : (
        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          {filtered.map((c, i) => (
            <div key={c?._id || i} style={{ height: '380px' }}>
              <ClassCard cls={c} index={i} onClick={handleBook} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
