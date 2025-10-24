import React from 'react';
import './LevelCard.css';

const LevelCard = ({ levelNumber, score = 0, maxScore = 3, onClick, isCompleted = false, isLocked = false }) => {
  const handleClick = () => {
    if (!isLocked && onClick) {
      onClick(levelNumber);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < maxScore; i++) {
      stars.push(
        <span 
          key={i} 
          className={`star ${i < score ? 'filled' : 'empty'}`}
        >
          ⭐
        </span>
      );
    }
    return stars;
  };

  return (
    <div 
      className={`level-card ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`}
      onClick={handleClick}
    >
      <div className="stars-container">
        {renderStars()}
      </div>
      
      <div className="level-circle">
        <span className="level-number">{levelNumber}</span>
      </div>
      
      {isLocked && (
        <div className="lock-overlay">
          <span className="lock-icon">🔒</span>
        </div>
      )}
    </div>
  );
};

export default LevelCard;
