import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <Link to="/" className="logo">VAJRA<span>.</span>GYM</Link>

        <ul className="nav-links">
          <li><NavLink to="/passes">Passes</NavLink></li>
          <li><NavLink to="/classes">Classes</NavLink></li>
          {location.pathname === '/' && (
            <>
              <li><a href="#features">Features</a></li>
              <li><a href="#transform">Transform</a></li>
              <li><a href="#app">App</a></li>
            </>
          )}
        </ul>

        <div className="nav-location">Udupi, Karnataka</div>

        {user ? (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/dashboard" className="nav-cta">Dashboard</Link>
            <button className="nav-cta" onClick={logout} style={{ borderColor: 'var(--secondary)', color: 'var(--secondary)' }}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="nav-cta">Login</Link>
        )}

        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <Link to="/passes" onClick={() => setMenuOpen(false)}>Passes</Link>
        <Link to="/classes" onClick={() => setMenuOpen(false)}>Classes</Link>
        {user ? (
          <>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <a href="#" onClick={(e) => { e.preventDefault(); logout(); setMenuOpen(false); }}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
          </>
        )}
      </div>
    </>
  );
}
