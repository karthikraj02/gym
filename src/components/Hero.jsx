import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const statsRef = useRef([]);
  const gridRef = useRef(null);

  useEffect(() => {
    // Count-up animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = +el.dataset.count;
            let start = 0;
            const suffix = target >= 1000 ? '+' : target <= 3 ? '' : '+';
            const duration = 1800;
            const step = Math.ceil(target / (duration / 16));
            const timer = setInterval(() => {
              start += step;
              if (start >= target) {
                start = target;
                clearInterval(timer);
              }
              el.textContent = start >= 1000 ? start.toLocaleString() + suffix : start + suffix;
            }, 16);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    statsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Parallax grid
    const onMove = (e) => {
      if (!gridRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gridRef.current.style.transform = `perspective(500px) rotateX(${-y * 0.3}deg) rotateY(${x * 0.3}deg)`;
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  const stats = [
    { count: 1000, label: 'Active Members' },
    { count: 50, label: 'Weekly Classes' },
    { count: 12, label: 'Expert Trainers' },
    { count: 3, label: 'Locations' },
  ];

  return (
    <section className="hero">
      <div className="hero-grid" ref={gridRef} />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-icon">◈</span>
          India's Most Advanced Gym Network
        </div>
        <h1 className="hero-title">
          <span className="line1">Forge Your</span>
          <span className="line2">Legend</span>
        </h1>
        <p className="hero-sub">A fitness movement worth breaking a sweat for</p>
        <div className="hero-btns">
          <Link to="/passes" className="btn-primary">Explore Vajra Pass</Link>
          <Link to="/classes" className="btn-outline">View Classes</Link>
        </div>
      </div>

      <div className="hero-stats">
        {stats.map((s, i) => (
          <div key={s.label} style={{ display: 'contents' }}>
            {i > 0 && <div className="stat-divider" />}
            <div className="stat-item">
              <div
                className="stat-num"
                data-count={s.count}
                ref={(el) => (statsRef.current[i] = el)}
              >
                0
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-scroll">
        <span>SCROLL</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
