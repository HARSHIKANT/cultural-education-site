import React, { useState, useEffect } from 'react';
import './VideoTask.css';

const VideoTask = ({ taskData, onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    // Use score from database
    const baseScore = taskData.content.score || 100;
    onComplete(baseScore);
  };

  return (
    <div className="video-task">
      <div className="video-container">
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${taskData.content.videoId}?enablejsapi=1`}
          title={taskData.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="video-info">
        <h3>{taskData.title}</h3>
        <p>{taskData.content.description}</p>
        <p className="video-duration">Duration: {Math.floor(taskData.content.duration / 60)} minutes</p>
      </div>

      <div className="task-actions">
        <button 
          onClick={handleComplete}
          className="complete-btn"
        >
          ✅ Mark as Completed (+{taskData.content.score || 100} points)
        </button>
      </div>
    </div>
  );
};

export default VideoTask;
