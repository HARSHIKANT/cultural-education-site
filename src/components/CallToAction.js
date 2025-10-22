import React from 'react';

const CallToAction = () => {
  const handleJoinNow = () => {
    showNotification('🚀 You\'re now part of the Cultural Explorer family!');
  };

  const handleLearnMore = () => {
    showNotification('📚 Discover more about our amazing cultural programs!');
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
    <section id="cta" className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>Ready for Your Cultural Journey? 🌟</h2>
          <p>Join thousands of kids exploring Indian culture in the most fun way!</p>
          <div className="cta-buttons">
            <button className="mega-button primary" onClick={handleJoinNow}>
              🎉 Join the Adventure!
            </button>
            <button className="mega-button secondary" onClick={handleLearnMore}>
              📖 Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

