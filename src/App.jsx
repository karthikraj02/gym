import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Passes from './pages/Passes';
import Classes from './pages/Classes';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function CustomCursor() {
  useEffect(() => {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMove);

    let raf;
    function animate() {
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      raf = requestAnimationFrame(animate);
    }
    animate();

    // Hover expand for interactive elements
    const grow = () => {
      ring.style.width = '60px';
      ring.style.height = '60px';
      ring.style.borderColor = 'rgba(0,245,255,0.8)';
    };
    const shrink = () => {
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(0,245,255,0.5)';
    };

    const observe = () => {
      document.querySelectorAll('button, a, .pass-card, .class-card, .transform-card, .join-card, .wellness-card').forEach(el => {
        el.addEventListener('mouseenter', grow);
        el.addEventListener('mouseleave', shrink);
      });
    };

    observe();
    const interval = setInterval(observe, 2000); // re-observe on route changes

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" id="cursorDot" />
      <div className="cursor-ring" id="cursorRing" />
    </>
  );
}

export default function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/passes" element={<Passes />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </>
  );
}
