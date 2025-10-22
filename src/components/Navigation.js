import React from 'react';

const Navigation = () => {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h1>🇮🇳 Cultural Explorer</h1>
      </div>
      <div className="nav-links">
        <a href="#home" className="nav-link" onClick={(e) => handleNavClick(e, '#home')}>Home</a>
        <a href="#learn" className="nav-link" onClick={(e) => handleNavClick(e, '#learn')}>Learn</a>
        <a href="#games" className="nav-link" onClick={(e) => handleNavClick(e, '#games')}>Games</a>
        <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, '#about')}>About</a>
      </div>
    </nav>
  );
};

export default Navigation;

