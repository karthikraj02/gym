import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../hooks/useApi';

export default function Dashboard() {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchBookings = async () => {
    try {
      const data = await api.get('/bookings/my', token);
      setBookings(data.data || data || []);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [token]);

  const cancelBooking = async (id) => {
    try {
      await api.delete(`/bookings/${id}`, token);
      setMessage('Booking cancelled.');
      fetchBookings();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <div className="section-label">Command Center</div>
          <h2 className="section-title" style={{ fontSize: '2rem' }}>
            Welcome, <span style={{ color: 'var(--primary)' }}>{user?.name || 'Warrior'}</span>
          </h2>
        </div>
      </div>

      {message && (
        <div style={{
          maxWidth: '1200px', margin: '0 auto 1.5rem', padding: '0.75rem',
          border: '1px solid var(--border)', background: 'var(--panel)',
          fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
          textAlign: 'center', color: 'var(--primary)', letterSpacing: '0.1em',
        }}>
          {message}
        </div>
      )}

      <div className="dashboard-grid">
        {/* Profile Card */}
        <div className="dash-card">
          <div className="dash-card-title">Profile</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div className="dash-stat-label">Name</div>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: '1.2rem', color: '#fff', letterSpacing: '0.05em' }}>
                {user?.name || '—'}
              </div>
            </div>
            <div>
              <div className="dash-stat-label">Email</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'rgba(0,245,255,0.6)' }}>
                {user?.email || '—'}
              </div>
            </div>
            <div>
              <div className="dash-stat-label">Role</div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em',
                color: 'var(--gold)', textTransform: 'uppercase',
              }}>
                {user?.role || 'member'}
              </div>
            </div>
          </div>
        </div>

        {/* Active Pass */}
        <div className="dash-card">
          <div className="dash-card-title">Active Pass</div>
          {user?.activePass ? (
            <div>
              <div className="dash-stat">{user.activePass.name || 'Vajra Pass'}</div>
              <div className="dash-stat-label" style={{ marginTop: '0.5rem' }}>
                Expires: {user.activePass.expiresAt
                  ? new Date(user.activePass.expiresAt).toLocaleDateString()
                  : 'Active'}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontFamily: 'var(--font-body)', color: 'rgba(224,247,250,0.4)', fontSize: '1rem' }}>
                No active pass
              </div>
              <a href="/passes" style={{
                display: 'inline-block', marginTop: '1rem',
                fontFamily: 'var(--font-head)', fontSize: '0.6rem',
                letterSpacing: '0.15em', color: 'var(--primary)',
                textDecoration: 'none', textTransform: 'uppercase',
              }}>
                → Activate a Pass
              </a>
            </div>
          )}
        </div>

        {/* Bookings */}
        <div className="dash-card" style={{ gridColumn: '1 / -1' }}>
          <div className="dash-card-title">My Bookings</div>
          {loading ? (
            <div className="loader"><div className="spinner" /></div>
          ) : bookings.length === 0 ? (
            <div style={{ fontFamily: 'var(--font-body)', color: 'rgba(224,247,250,0.4)', fontSize: '1rem' }}>
              No class bookings yet.{' '}
              <a href="/classes" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                Browse classes →
              </a>
            </div>
          ) : (
            bookings.map(b => (
              <div className="booking-item" key={b._id || b.id}>
                <div>
                  <div className="booking-name">{b.class?.name || b.className || 'Class'}</div>
                  <div className="booking-time">
                    {b.class?.schedule || b.date
                      ? new Date(b.date || b.class?.schedule).toLocaleString()
                      : 'Scheduled'}
                  </div>
                </div>
                <button className="booking-cancel" onClick={() => cancelBooking(b._id || b.id)}>
                  Cancel
                </button>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        <div className="dash-card">
          <div className="dash-card-title">Total Bookings</div>
          <div className="dash-stat">{bookings.length}</div>
          <div className="dash-stat-label">Classes booked</div>
        </div>

        <div className="dash-card">
          <div className="dash-card-title">Member Since</div>
          <div className="dash-stat" style={{ fontSize: '1.5rem' }}>
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
              : '2026'}
          </div>
          <div className="dash-stat-label">Forging legends</div>
        </div>
      </div>
    </div>
  );
}
