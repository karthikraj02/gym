import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PassCard from '../components/PassCard';
import { useAuth } from '../context/AuthContext';
import api from '../hooks/useApi';

export default function Passes() {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/passes')
      .then(d => setPasses(d.data || d || []))
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
  }, [passes]);

  const handleActivate = async (pass) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const id = pass._id || pass.id;
      if (id) {
        await api.post(`/passes/${id}/activate`, {}, token);
        setMessage(`✅ ${pass.name || 'Pass'} activated successfully!`);
      } else {
        setMessage('Pass ID not available. Backend may be offline.');
      }
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
    setTimeout(() => setMessage(''), 4000);
  };

  const defaultPasses = [null, null, null, null];
  const displayPasses = passes.length > 0 ? passes : defaultPasses;

  return (
    <section className="passes-section" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
      <div className="passes-header reveal">
        <div className="section-label" style={{ justifyContent: 'center' }}>vajrapass</div>
        <h2 className="section-title">Choose Your<br />Battle Plan</h2>
        <p style={{
          fontFamily: 'var(--font-body)', color: 'rgba(224,247,250,0.5)',
          marginTop: '1rem', fontSize: '1rem', letterSpacing: '0.05em',
        }}>
          Unlimited access. Zero compromises. Maximum results.
        </p>
      </div>

      {message && (
        <div style={{
          maxWidth: '600px', margin: '0 auto 2rem', padding: '1rem',
          border: '1px solid var(--border)', background: 'var(--panel)',
          fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
          textAlign: 'center', color: 'var(--primary)',
          letterSpacing: '0.1em',
        }}>
          {message}
        </div>
      )}

      {loading ? (
        <div className="loader"><div className="spinner" /></div>
      ) : (
        <div className="passes-grid reveal">
          {displayPasses.map((p, i) => (
            <PassCard key={p?._id || i} pass={p} index={i} onActivate={handleActivate} />
          ))}
        </div>
      )}
    </section>
  );
}
