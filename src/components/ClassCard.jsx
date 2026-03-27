const gradients = [
  'linear-gradient(135deg,#0a1628,#0d2137)',
  'linear-gradient(135deg,#1a0a0a,#2d0d1a)',
  'linear-gradient(135deg,#0a1a0a,#0d2d1a)',
  'linear-gradient(135deg,#1a1400,#2d2200)',
  'linear-gradient(135deg,#0a0a1a,#0d0d2d)',
  'linear-gradient(135deg,#1a0a14,#2d0d22)',
  'linear-gradient(135deg,#001a1a,#002d2d)',
];

const defaultClasses = [
  { tag: 'Strength', name: 'Iron Protocol', desc: 'Heavy compound lifts with real-time coaching feedback and progressive overload tracking.', emoji: '💪' },
  { tag: 'Combat', name: 'Storm MMA', desc: 'Mixed martial arts fundamentals, cardio boxing, and reflex training for all levels.', emoji: '🥊' },
  { tag: 'Recovery', name: 'Zero Gravity Yoga', desc: 'Mobility, breathwork and mindfulness for complete physical and mental recovery.', emoji: '🧘' },
  { tag: 'Cardio', name: 'Plasma HIIT', desc: 'High-intensity intervals designed to torch calories and build explosive endurance.', emoji: '⚡' },
  { tag: 'Endurance', name: 'Velocity Run', desc: 'Treadmill, track drills, and VO2 max training with biometric feedback loops.', emoji: '🏃' },
  { tag: 'Functional', name: 'Kinetic Flow', desc: 'Gymnastics-inspired movement patterns to build total body athleticism.', emoji: '🤸' },
  { tag: 'Aqua', name: 'Hydro Combat', desc: 'Pool-based resistance training and swim drills for low-impact high-output results.', emoji: '🌊' },
];

export default function ClassCard({ cls, index, onClick }) {
  const i = index || 0;
  const d = cls || defaultClasses[i] || defaultClasses[0];
  const tag = d.tag || d.category || 'Class';
  const name = d.name || d.title || 'Workout';
  const desc = d.desc || d.description || '';
  const emoji = d.emoji || '🔥';
  const bg = gradients[i % gradients.length];

  return (
    <div className="class-card" onClick={() => onClick && onClick(d)}>
      <div className="class-border" />
      <div className="class-bg" style={{ background: bg }}>{emoji}</div>
      <div className="class-overlay" />
      <div className="class-content">
        <div className="class-tag">{tag}</div>
        <div className="class-name">{name}</div>
        <div className="class-desc">{desc}</div>
        {d.schedule && (
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            color: 'rgba(0,245,255,0.5)',
            letterSpacing: '0.1em',
            marginTop: '0.5rem',
          }}>
            {d.schedule}
          </div>
        )}
      </div>
    </div>
  );
}

export { defaultClasses };
