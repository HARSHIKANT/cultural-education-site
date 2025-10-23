import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navigation from './Navigation';
import Hero from './Hero';
import Features from './Features';
import InteractiveLearning from './InteractiveLearning';
import CallToAction from './CallToAction';
import Footer from './Footer';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="App">
      <Navigation />
      <Hero />
      <Features />
      <InteractiveLearning />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;