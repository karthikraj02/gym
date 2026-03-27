import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import PassCard from '../components/PassCard';
import ClassCard, { defaultClasses } from '../components/ClassCard';
import api from '../hooks/useApi';

/* ─── Ticker Bar ─── */
function Ticker() {
  const items = [
    'Vajra Elite Pass', '1000+ Members', '12+ Expert Trainers',
    'AI-Powered Workouts', 'Group Classes Daily', 'Nutrition Coaching', 'Forge Your Legend',
  ];
  return (
    <div className="ticker-wrap">
      <div className="ticker">
        {[...items, ...items].map((t, i) => (
          <span className="ticker-item" key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Features Section ─── */
function Features() {
  const hexIcons = [
    '🏋️','🧬','⚡','🎯','💊',
    '🥗','🔬','📊','🏃','🧠',
    '🤖','🫀','💪','🔥','🎖',
    '🎵','📱','🌐','⚙️','🚀',
    '🧊','🎮','🩺','💡','🛡️',
  ];

  const hexGridRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hexGridRef.current) return;
      const hexes = hexGridRef.current.querySelectorAll('.hex');
      const rand = hexes[Math.floor(Math.random() * hexes.length)];
      if (!rand) return;
      rand.style.background = 'rgba(0,245,255,0.2)';
      rand.style.borderColor = 'var(--primary)';
      rand.style.boxShadow = 'var(--glow)';
      setTimeout(() => {
        rand.style.background = '';
        rand.style.borderColor = '';
        rand.style.boxShadow = '';
      }, 600);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: '🤖', title: 'AI-Powered Training', desc: 'Adaptive workout plans that evolve with your performance data in real time.' },
    { icon: '🧬', title: 'Biometric Tracking', desc: 'Heart rate, recovery, VO2 max — monitored and optimized every session.' },
    { icon: '🔥', title: 'Elite Trainer Network', desc: '12+ certified coaches with international competition experience on your side.' },
    { icon: '📡', title: 'Connected Ecosystem', desc: 'One pass connects gym, classes, nutrition, recovery and at-home workouts.' },
  ];

  return (
    <section className="features-section" id="features">
      <div className="features-grid">
        <div className="features-visual reveal">
          <div className="hex-grid" ref={hexGridRef}>
            {hexIcons.map((icon, i) => (
              <div className={`hex${i % 2 === 0 ? ' active' : ''}`} key={i} style={{ animationDelay: `${(i * 0.2) % 2.5}s` }}>
                {icon}
              </div>
            ))}
          </div>
        </div>
        <div className="features-list reveal">
          <div className="section-label">Why Vajra</div>
          <h2 className="section-title" style={{ marginBottom: '2rem' }}>
            Built for<br />Champions
          </h2>
          {features.map((f) => (
            <div className="feature-item" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Transform Section ─── */
function Transform() {
  const cards = [
    { icon: '⚡', title: 'Vajra Transform', sub: '8-week coached weight-loss protocol with guaranteed results' },
    { icon: '📖', title: 'The Vajra Way', sub: 'Expert guides, nutrition plans and recovery science' },
    { icon: '👕', title: 'Gear Store', sub: 'Premium performance apparel and workout equipment' },
    { icon: '🩺', title: 'Vitals.fit', sub: 'Holistic health monitoring and medical wellness support' },
  ];

  return (
    <section className="transform-section" id="transform">
      <div className="reveal">
        <div className="section-label" style={{ justifyContent: 'center' }}>Programs</div>
        <h2 className="section-title">
          Accelerate Your<br />
          <span style={{ color: 'var(--secondary)' }}>Transformation</span>
        </h2>
      </div>
      <div className="transform-grid reveal">
        {cards.map((c) => (
          <div className="transform-card" key={c.title}>
            <div className="transform-card-icon">{c.icon}</div>
            <div className="transform-card-title">{c.title}</div>
            <div className="transform-card-sub">{c.sub}</div>
            <div className="transform-arrow">→</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Wellness Marquee ─── */
function WellnessMarquee() {
  const items = [
    { icon: '🏋️', name: 'STRENGTH' },
    { icon: '🥗', name: 'NUTRITION' },
    { icon: '🧘', name: 'YOGA' },
    { icon: '🏊', name: 'SWIMMING' },
    { icon: '🥊', name: 'BOXING' },
    { icon: '🚴', name: 'CYCLING' },
    { icon: '🧠', name: 'MINDFULNESS' },
    { icon: '💊', name: 'SUPPLEMENTS' },
  ];

  return (
    <section className="wellness-section">
      <div className="wellness-title reveal">
        <div className="section-label" style={{ justifyContent: 'center' }}>Wellness Hub</div>
        <h2 className="section-title">Everything You Need<br />In One Place</h2>
      </div>
      <div className="wellness-marquee-wrap">
        <div className="wellness-marquee">
          {[...items, ...items].map((w, i) => (
            <div className="wellness-card" key={i}>
              <div className="wellness-card-icon">{w.icon}</div>
              <div className="wellness-card-name">{w.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── App Download Section ─── */
function AppDownload() {
  return (
    <div className="app-section" id="app">
      <div className="app-content reveal">
        <div className="section-label">Mobile</div>
        <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
          Download The<br />Most Advanced<br />Fitness App
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)', color: 'rgba(224,247,250,0.5)',
          fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem',
        }}>
          Track every rep, monitor every metric, book classes in seconds. Your gym in your pocket — powered by AI.
        </p>
        <div className="app-stores">
          <button className="store-btn">
            <div className="store-btn-icon">🍎</div>
            <div className="store-btn-text">
              <div className="store-btn-sub">Download on the</div>
              <div className="store-btn-name">App Store</div>
            </div>
          </button>
          <button className="store-btn">
            <div className="store-btn-icon">▶</div>
            <div className="store-btn-text">
              <div className="store-btn-sub">Get it on</div>
              <div className="store-btn-name">Google Play</div>
            </div>
          </button>
        </div>
      </div>

      <div className="app-visual reveal">
        <div className="phone-mockup phone-1">
          <div className="phone-inner">
            <div className="phone-logo">VAJRA</div>
            <div style={{ width: '100%', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(0,245,255,0.5)', letterSpacing: '0.1em' }}>
              TODAY'S METRICS
            </div>
            <div className="phone-stat-bar"><div className="phone-stat-fill" /></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '1rem', color: 'var(--primary)' }}>847</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(224,247,250,0.4)' }}>CAL</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '1rem', color: 'var(--gold)' }}>78%</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(224,247,250,0.4)' }}>LOAD</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '1rem', color: 'var(--secondary)' }}>142</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'rgba(224,247,250,0.4)' }}>BPM</div>
              </div>
            </div>
            <div className="phone-menu-item">▹ PLASMA HIIT — 18:00</div>
            <div className="phone-menu-item">▹ IRON PROTOCOL — 20:00</div>
            <div className="phone-menu-item">▹ ZERO GRAVITY YOGA — 07:00</div>
          </div>
        </div>

        <div className="phone-mockup phone-2">
          <div className="phone-inner">
            <div className="phone-logo">VAJRA</div>
            <div style={{ width: '100%', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(0,245,255,0.5)', letterSpacing: '0.1em' }}>
              WEEKLY PROGRESS
            </div>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '80px', width: '100%' }}>
              {[40, 65, 50, 85, 70, 45, 20].map((h, i) => (
                <div key={i} style={{
                  flex: 1,
                  background: i === 3 ? 'rgba(0,245,255,0.3)' : 'rgba(0,245,255,0.15)',
                  height: `${h}%`,
                  borderTop: `1px solid ${i === 3 ? 'var(--gold)' : 'var(--primary)'}`,
                }} />
              ))}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(224,247,250,0.3)', letterSpacing: '0.1em' }}>
              MON TUE WED THU FRI SAT SUN
            </div>
            <div className="phone-menu-item" style={{ color: 'var(--gold)' }}>▹ VAJRA ELITE — ACTIVE</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Join Section ─── */
function JoinSection() {
  return (
    <div className="join-section">
      <div className="join-card reveal">
        <div className="join-card-icon">🏅</div>
        <div className="join-card-title">Careers at Vajra</div>
        <div className="join-card-sub">
          Join a team of elite coaches, nutritionists, and fitness scientists building the future of health.
        </div>
        <div className="join-card-link">Learn More <span className="arrow">→</span></div>
      </div>
      <div className="join-card reveal" style={{ transitionDelay: '0.15s' }}>
        <div className="join-card-icon">🏢</div>
        <div className="join-card-title">Vajra Franchise</div>
        <div className="join-card-sub">
          Partner with India's most advanced gym brand. Own a Vajra center in your city.
        </div>
        <div className="join-card-link">Learn More <span className="arrow">→</span></div>
      </div>
    </div>
  );
}

/* ═════════════════ HOME PAGE ═════════════════ */
export default function Home() {
  const [passes, setPasses] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Try to load data from API, fallback to defaults
    api.get('/passes').then((d) => setPasses(d.data || d || [])).catch(() => {});
    api.get('/classes').then((d) => setClasses(d.data || d || [])).catch(() => {});
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [passes, classes]);

  const displayPasses = passes.length > 0 ? passes : [null, null, null, null];
  const displayClasses = classes.length > 0 ? classes : defaultClasses;

  return (
    <>
      <Ticker />
      <Hero />

      {/* PASSES */}
      <section className="passes-section" id="passes">
        <div className="passes-header reveal">
          <div className="section-label" style={{ justifyContent: 'center' }}>vajrapass</div>
          <h2 className="section-title">One Membership.<br />Every Goal.</h2>
          <p style={{
            fontFamily: 'var(--font-body)', color: 'rgba(224,247,250,0.5)',
            marginTop: '1rem', fontSize: '1rem', letterSpacing: '0.05em',
          }}>
            Unlimited access. Zero compromises. Maximum results.
          </p>
        </div>
        <div className="passes-grid reveal">
          {displayPasses.map((p, i) => (
            <PassCard key={p?._id || i} pass={p} index={i} />
          ))}
        </div>
      </section>

      {/* CLASSES */}
      <section className="classes-section" id="classes">
        <div className="classes-header reveal">
          <div>
            <div className="section-label">Disciplines</div>
            <h2 className="section-title">Expert-Led<br />Group Classes</h2>
          </div>
          <Link to="/classes" className="btn-outline">View All Classes</Link>
        </div>
        <div className="classes-scroll reveal">
          {displayClasses.map((c, i) => (
            <ClassCard key={c?._id || i} cls={c} index={i} />
          ))}
        </div>
      </section>

      <Features />
      <Transform />
      <WellnessMarquee />
      <AppDownload />
      <JoinSection />
    </>
  );
}
