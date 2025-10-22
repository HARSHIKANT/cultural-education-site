import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
      <p>Loading your cultural adventure...</p>
    </div>
  );
};

export default LoadingScreen;

