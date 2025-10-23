import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleNavClick = (e, target) => {
    e.preventDefault();

    if (target === 'home') {
      navigate('/');
      return;
    } else if (target === 'dashboard') {
      navigate('/dashboard');
      return;
    } else if (target === 'login') {
      navigate('/login');
      return;
    }

    // For scrolling to sections on the homepage (if already there)
    const targetElement = document.querySelector(`#${target}`);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      // If you're on another route, go home first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(`#${target}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h1>🇮🇳 Cultural Explorer</h1>
      </div>
      <div className="nav-links">
        <a href="#home" className="nav-link" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
        <a href="#features" className="nav-link" onClick={(e) => handleNavClick(e, 'features')}>Features</a>
        <a href="#interactive" className="nav-link" onClick={(e) => handleNavClick(e, 'interactive')}>Learning</a>
        <a href="#cta" className="nav-link" onClick={(e) => handleNavClick(e, 'cta')}>About</a>
        
        {/* Authentication-based navigation */}
        {user ? (
          <>
            <a href="#dashboard" className="nav-link" onClick={(e) => handleNavClick(e, 'dashboard')}>Dashboard</a>
            <button className="nav-link sign-out-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          <a href="#login" className="nav-link login-btn" onClick={(e) => handleNavClick(e, 'login')}>
            Sign In
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

