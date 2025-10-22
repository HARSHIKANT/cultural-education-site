import React from 'react';
import { useNavigate } from 'react-router-dom';


const Navigation = () => {
  const navigate = useNavigate();

  const handleNavClick = (e, target) => {
    e.preventDefault();

    if (target === 'home') {
      // ✅ Navigate to home page
      navigate('/');
      return;
    } else if (target === 'learn') {
      // Navigate to learning page
      navigate('/learning');
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
      // If you’re on another route, go home first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(`#${target}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h1>🇮🇳 Cultural Explorer</h1>
      </div>
      <div className="nav-links">
        <a href="#home" className="nav-link" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
        <a href="#learn" className="nav-link" onClick={(e) => handleNavClick(e, 'learn')}>Learn</a>
        <a href="#games" className="nav-link" onClick={(e) => handleNavClick(e, 'games')}>Games</a>
        <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, 'about')}>About</a>
      </div>
    </nav>
  );
};

export default Navigation;

