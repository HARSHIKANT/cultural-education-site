import React from 'react';

const Features = () => {
  const features = [
    {
      icon: '🛕 🕌',
      title: 'Famous Monuments',
      description: 'Explore the Taj Mahal, Red Fort, and other amazing places in 3D!',
      buttonText: 'Explore Monuments'
    },
    {
      icon: '🎭',
      title: 'Traditional Arts',
      description: 'Learn about classical dances, music, and beautiful handicrafts!',
      buttonText: 'Discover Arts'
    },
    {
      icon: '🍛',
      title: 'Delicious Food',
      description: 'Find out about yummy Indian dishes and their special stories!',
      buttonText: 'Taste Culture'
    },
    {
      icon: '🪔🎇🫟',
      title: 'Festivals',
      description: 'Celebrate Diwali, Holi, and other colorful festivals with us!',
      buttonText: 'Join Festivals'
    }
  ];

  const handleFeatureClick = (feature) => {
    const messages = {
      'Famous Monuments': '🏛️ Discover the architectural wonders of India!',
      'Traditional Arts': '🎭 Learn about the rich artistic heritage of India!',
      'Delicious Food': '🍛 Explore the diverse and flavorful cuisine of India!',
      'Festivals': '🎪 Celebrate the vibrant festivals of India!'
    };
    
    showNotification(messages[feature] || '🌟 Explore this amazing feature!');
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
    <section id="features" className="features-section">
      <div className="container">
        <h2 className="section-title">What You'll Discover! ✨</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card" 
              data-animation="bounce"
              onClick={() => handleFeatureClick(feature.title)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <button 
                className="feature-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFeatureClick(feature.title);
                }}
              >
                {feature.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

