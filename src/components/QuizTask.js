import React, { useState } from 'react';
import './QuizTask.css';

const QuizTask = ({ taskData, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = taskData.content.questions;

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correct) {
        correctAnswers++;
      }
    });
    const calculatedScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(calculatedScore);
  };

  const handleComplete = () => {
    onComplete(score);
  };

  const currentQ = questions[currentQuestion];

  if (showResults) {
    return (
      <div className="quiz-results">
        <h2>Quiz Results</h2>
        <div className="score-display">
          <div className="score-circle">
            <span className="score-number">{score}</span>
            <span className="score-label">Score</span>
          </div>
        </div>
        <div className="results-summary">
          <p>You answered {Object.keys(answers).length} out of {questions.length} questions.</p>
          <p>Your score: {score}%</p>
        </div>
        <button onClick={handleComplete} className="complete-btn">
          Complete Task (+{score} points)
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-task">
      <div className="quiz-header">
        <h3>Question {currentQuestion + 1} of {questions.length}</h3>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="question-container">
        <h4 className="question-text">{currentQ.question}</h4>
        <div className="options">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              className={`option ${answers[currentQ.id] === index ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(currentQ.id, index)}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-actions">
        <button 
          onClick={handleNext}
          className="next-btn"
          disabled={answers[currentQ.id] === undefined}
        >
          {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default QuizTask;
