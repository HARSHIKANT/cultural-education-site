import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import LearningPage from './components/LearningPage';
import LoadingScreen from './components/LoadingScreen';
import './App.css';
import Monuments from './components/Monuments';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path='/monuments' element={<Monuments/>} />
          <Route 
            path="/learning/:levelId/:taskId" 
            element={
              <ProtectedRoute>
                <LearningPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

