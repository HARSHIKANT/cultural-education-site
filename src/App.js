import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import InteractiveLearning from './components/InteractiveLearning';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

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
}

export default App;

