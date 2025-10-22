// filepath: /Users/harshikantdubey/Desktop/cultural education site/src/components/LearningPage.js
import React from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import Features from './Features';
import InteractiveLearning from './InteractiveLearning';
import CallToAction from './CallToAction';
import Footer from './Footer';

const Home = () => {
  return (
    <div>
    <Navigation/>
      <Hero />
      <Features />
      <InteractiveLearning />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;