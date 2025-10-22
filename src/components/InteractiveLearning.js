import React from 'react';

const InteractiveLearning = () => {
  const learningCards = [
    {
      title: '🎨 Art & Craft Corner',
      description: 'Create beautiful rangoli patterns and learn traditional art!',
      buttonText: 'Start Creating'
    },
    {
      title: '📚 Story Time',
      description: 'Listen to amazing Indian folktales and legends!',
      buttonText: 'Listen Stories'
    },
    {
      title: '🎵 Music & Dance',
      description: 'Learn traditional songs and dance moves!',
      buttonText: 'Start Dancing'
    }
  ];

  const handleLearningClick = (card) => {
    const messages = {
      '🎨 Art & Craft Corner': '🎨 Let\'s create beautiful Indian art together!',
      '📚 Story Time': '📚 Listen to magical Indian stories and legends!',
      '🎵 Music & Dance': '🎵 Learn the rhythm and moves of Indian culture!'
    };
    
    showNotification(messages[card] || '🌟 Start your interactive learning journey!');
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
    <section id="interactive" className="interactive-section">
      <div className="container">
        <h2 className="section-title">Interactive Learning Zone! 🎯</h2>
        <div className="learning-grid">
          {learningCards.map((card, index) => (
            <div 
              key={index} 
              className="learning-card"
              onClick={() => handleLearningClick(card.title)}
            >
              <div className="card-header">
                <h3>{card.title}</h3>
              </div>
              <div className="card-content">
                <p>{card.description}</p>
                <button 
                  className="learning-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLearningClick(card.title);
                  }}
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveLearning;

