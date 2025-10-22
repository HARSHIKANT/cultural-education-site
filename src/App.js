import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import InteractiveLearning from './components/InteractiveLearning';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import './App.css';
import { supabase } from "../src/utils/supabase.ts";
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import LearningPage from './components/LearningPage'; // Create this component
import Home from './components/Home';


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function getTodos() {
      const { data: todos } = await supabase.from('todos').select()

      if (todos?.length > 1) {
        setTodos(todos)
      }
    }

    getTodos()
  }, [])

  console.log("todos",todos)

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
    <BrowserRouter>
      <Routes>
        <Route path="/learning" element={<LearningPage/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <Navigation />
    //   <Hero />
    //   <Features />
    //   <InteractiveLearning />
    //   <CallToAction />
    //   <Footer />
    // </div>
  );
}

export default App;

