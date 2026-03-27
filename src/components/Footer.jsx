import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="logo">VAJRA<span>.</span>GYM</Link>
          <p className="footer-tagline">
            At Vajra Gym, we make strength training scientific, group workouts electric,
            recovery intelligent, and nutrition effortless. #ForgeYourLegend
          </p>
          <div className="footer-social">
            <button className="social-btn" aria-label="Twitter">𝕏</button>
            <button className="social-btn" aria-label="Facebook">f</button>
            <button className="social-btn" aria-label="LinkedIn">in</button>
            <button className="social-btn" aria-label="YouTube">▶</button>
            <button className="social-btn" aria-label="Instagram">◯</button>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Passes</div>
          <ul className="footer-links">
            <li><Link to="/passes">Vajra Elite</Link></li>
            <li><Link to="/passes">Vajra Pro</Link></li>
            <li><Link to="/passes">Vajra Play</Link></li>
            <li><Link to="/passes">Vajra Select</Link></li>
            <li><Link to="/passes">Corporate Plans</Link></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Company</div>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Franchise</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Legal</div>
          <ul className="footer-links">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Refund Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">
          © 2026 VAJRA GYM PVT. LTD. — UDUPI, KARNATAKA — ALL SYSTEMS OPERATIONAL
        </div>
        <div className="footer-pulse">
          <div className="pulse-dot" />
          LIVE SYSTEM ACTIVE
        </div>
      </div>
    </footer>
  );
}
