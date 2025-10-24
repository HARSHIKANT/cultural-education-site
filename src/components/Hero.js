import React from 'react';
import ThreeScene from './ThreeScene';
import { useNavigate } from 'react-router-dom';


const Hero = () => {

  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate('/dashboard');
  };

  const handleExplore3D = () => {
    navigate('/monuments');
  };

  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  };

  return (
    <section id="hero" className="hero-section" style={{
      display: 'flex',           // split screen
      height: '100vh',
      overflow: 'hidden',           // full viewport height
    }}>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Welcome to Your 
            <span className="gradient-text"> Indian Cultural</span> 
            Adventure! 🎉
          </h1>
          <p className="hero-subtitle">
            Discover the magic of India through fun 3D experiences, 
            interactive games, and exciting stories!
          </p>
          <div className="hero-buttons">
            <button className="cta-button primary" onClick={handleStartLearning}>
              🚀 Start Learning Now!
            </button>
            <button className="cta-button secondary" onClick={handleExplore3D}>
              🎮 Explore 3D World
            </button>
          </div>
        </div>
      </div>
      
      {/* 3D Scene Container */}
      <div className="three-container" style={{
      flex: 1,                  // right half
      height: '100%',           // full height
    }}>
        <ThreeScene />
      </div>
    </section>
  );
};

export default Hero;

