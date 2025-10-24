import React, { useState } from 'react';
import Navigation from './Navigation';

const Monuments = () => {
  const [activeModel, setActiveModel] = useState('indiagate');

  const models = {
    indiagate: {
      title: 'India Gate',
      url: 'https://sketchfab.com/models/59fe55328271479d82acb65310178d99/embed',
    },
    charminar: {
      title: 'Charminar',
      url: 'https://sketchfab.com/models/02f2b1c07bbd42388ba75b4db60ea821/embed',
    },
    tajmahal: {
      title: 'Taj Mahal',
      url: 'https://sketchfab.com/models/df6d5328741c4abb96f3ecd4c933c7bd/embed',
    },
  };

  const info = {
    tajmahal: [
      'The Taj Mahal is a white marble palace built in Agra city of India.',
      'It was made by Emperor Shah Jahan in memory of his wife Mumtaz Mahal.',
    ],
    charminar: [
      'Charminar is a famous square-shaped monument in Hyderabad, India.',
      'It has four tall towers (minarets) at each corner.',
      'It was built more than 400 years ago and is very popular with tourists.',
    ],
    indiagate: [
      'India Gate is a big stone arch in Delhi, India.',
      'It honors soldiers who died in World War I.',
      'People love to take pictures and have picnics near it.',
    ],
  };

  const currentModel = models[activeModel];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '80px',
        gap: '20px',
        padding: '20px',
      }}
    >
      {/* Navigation */}
      <div style={{ width: '100%', marginBottom: '40px' }}>
        <Navigation />
      </div>

      {/* Title */}
      <h1
        style={{
          margin: 0,
          textAlign: 'center',
          fontWeight: 700,
          fontSize: '2rem',
          color: '#fdfdfd',
        }}
      >
        {currentModel.title.toUpperCase()}
      </h1>

      {/* Buttons */}
      <div
        style={{
          margin: '10px 0',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        {Object.keys(models).map((key) => (
          <button
            key={key}
            onClick={() => setActiveModel(key)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeModel === key ? '#1CAAD9' : '#e0e0e0',
              color: activeModel === key ? 'white' : 'black',
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'all 0.3s ease',
            }}
          >
            {models[key].title}
          </button>
        ))}
      </div>

      {/* Responsive container */}
      <div
        style={{
          display: 'flex',
          flexDirection: window.innerWidth < 900 ? 'column' : 'row',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* 3D Viewer */}
        <div
          style={{
            width: window.innerWidth < 900 ? '100%' : '900px',
            height: window.innerWidth < 900 ? '400px' : '700px',
            maxWidth: '100%',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            flexShrink: 0,
            alignSelf: 'center',
          }}
        >
          <iframe
            key={activeModel}
            title={currentModel.title}
            frameBorder="0"
            allowFullScreen
            allow="autoplay; fullscreen; xr-spatial-tracking"
            style={{ width: '100%', height: '100%' }}
            src={currentModel.url}
          ></iframe>
        </div>

        {/* Info Box */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            width: window.innerWidth < 900 ? '100%' : 'auto',
            alignItems: window.innerWidth < 900 ? 'center' : 'flex-start',
          }}
        >
          {info[activeModel].map((point, index) => (
            <div
              key={index}
              style={{
                background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                color: 'white',
                padding: '1rem 1.5rem',
                borderRadius: '25px',
                fontWeight: 700,
                fontSize: window.innerWidth < 900 ? '1rem' : '1.1rem',
                transition: 'transform 0.3s ease',
                textAlign: 'center',
                maxWidth: '600px',
              }}
            >
              {point}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Monuments;
