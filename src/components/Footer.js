import React from 'react';

const Footer = () => {
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
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>🇮🇳 Cultural Explorer</h4>
            <p>Making Indian culture fun and accessible for children worldwide!</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a></li>
              <li><a href="#learn" onClick={(e) => handleNavClick(e, '#learn')}>Learn</a></li>
              <li><a href="#games" onClick={(e) => handleNavClick(e, '#games')}>Games</a></li>
              <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>📧 hello@culturalexplorer.com</p>
            <p>📱 +91 98765 43210</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Cultural Explorer. Made with ❤️ for young learners!</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

