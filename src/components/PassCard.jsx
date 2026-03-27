import { useAuth } from '../context/AuthContext';

export default function PassCard({ pass, index, onActivate }) {
  const { user } = useAuth();

  // Default pass data for static rendering
  const defaults = [
    {
      tier: 'Tier 01', name: 'Vajra Elite', featured: true, badge: 'MOST POPULAR',
      features: ['All group classes — unlimited', 'Access to all Elite & PRO gyms', 'At-home live workouts', 'AI-powered training plans', 'Priority class booking'],
      price: '2,999', period: '/mo',
    },
    {
      tier: 'Tier 02', name: 'Vajra Pro', featured: false,
      features: ['All PRO gyms — unlimited', '2 Elite gym sessions/month', 'At-home live workouts', 'Nutrition tracking'],
      price: '1,499', period: '/mo',
    },
    {
      tier: 'Tier 03', name: 'Vajra Play', featured: false,
      features: ['Badminton, Swimming & sports', 'Guaranteed playing partner', 'Expert guided sessions', 'Multi-sport access'],
      price: '999', period: '/mo',
    },
    {
      tier: 'Tier 04', name: 'Vajra Select', featured: false,
      features: ['Single center of your choice', 'Guest visits to other centers', 'At-home live workouts', 'Personal trainer sessions'],
      price: '699', period: '/mo',
    },
  ];

  const d = pass || defaults[index] || defaults[0];
  const isFeatured = d.featured || d.tier === 'ELITE';
  const features = d.features || d.benefits || [];
  const name = d.name || d.title || 'Vajra Pass';
  const tier = d.tier || `Tier 0${(index || 0) + 1}`;
  const price = d.price || d.amount;
  const period = d.period || d.duration || '/mo';

  return (
    <div className={`pass-card${isFeatured ? ' featured' : ''}`}>
      {isFeatured && <div className="pass-badge">{d.badge || 'MOST POPULAR'}</div>}
      <div className="pass-tier">{tier}</div>
      <div className="pass-name">{name}</div>
      {price && (
        <div className="pass-price">
          <span className="currency">₹</span>{price}
          <span className="period">{period}</span>
        </div>
      )}
      <ul className="pass-features">
        {features.map((f, i) => (
          <li key={i}>{typeof f === 'string' ? f : f.text || f.name}</li>
        ))}
      </ul>
      <button
        className="pass-cta"
        onClick={() => onActivate ? onActivate(d) : null}
      >
        {user ? `Activate ${name.split(' ').pop()} Pass` : 'Login to Activate'}
      </button>
    </div>
  );
}
