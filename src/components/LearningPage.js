// filepath: /Users/harshikantdubey/Desktop/cultural education site/src/components/LearningPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

const LearningPage = () => {
    
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

    showNotification('🎉 Welcome to your cultural journey! Let\'s start learning!')
  return (
    <div>
        <Navigation />
      <h1>Welcome to the Learning Page!</h1>
      <p>Start your cultural journey here.</p>
    </div>
  );
};

export default LearningPage;