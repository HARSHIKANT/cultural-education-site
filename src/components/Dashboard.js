import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from "../utils/supabase.ts";
import './Dashboard.css';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Game levels configuration
  const [levels, setLevels] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserProgress();
      fetchLevels();
      fetchTasks();
      fetchCompletedTasks();
    }
  }, [user]);

  // Update level unlocking when userProgress changes
  useEffect(() => {
    if (userProgress) {
      updateLevelUnlocking(userProgress);
    }
  }, [userProgress]);

  // Ensure Level 1 is always unlocked
  useEffect(() => {
    setLevels(prevLevels => 
      prevLevels.map(level => ({
        ...level,
        unlocked: level.id === 1 || level.unlocked
      }))
    );
  }, []);

  const fetchLevels = async () => {
    try {
      const { data, error } = await supabase
        .from('levels')
        .select('*')
        .order('id');

      if (error) {
        console.error('Error fetching levels:', error);
      } else if (data) {
        console.log('Fetched levels:', data);
        setLevels(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('is_active', true)
        .order('level_id, order_index');

      if (error) {
        console.error('Error fetching tasks:', error);
      } else if (data) {
        console.log('Fetched tasks:', data);
        setTasks(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchCompletedTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('task_completions')
        .select('task_id, level_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching completed tasks:', error);
      } else if (data) {
        const completedTaskIds = data.map(task => `${task.level_id}-${task.task_id}`);
        setCompletedTasks(completedTaskIds);
        console.log('Completed tasks:', completedTaskIds);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchUserProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching progress:', error);
      } else if (data && data.length > 0) {
        // Get the most recent progress record
        const latestProgress = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0];
        setUserProgress(latestProgress);
        updateLevelUnlocking(latestProgress);
      } else {
        // No progress record exists yet, try to create one
        // If it fails due to race condition, fetch the existing one
        try {
          const { data: newProgress, error: insertError } = await supabase
            .from('user_progress')
            .insert({
              user_id: user.id,
              completed_tasks: 0,
              total_score: 0,
              current_level: 1
            })
            .select()
            .single();

          if (insertError) {
            // If insert fails due to unique constraint, fetch existing record
            if (insertError.code === '23505') {
              console.log('Progress record already exists, fetching...');
              const { data: existingData } = await supabase
                .from('user_progress')
                .select('*')
                .eq('user_id', user.id)
                .single();
              
              if (existingData) {
                setUserProgress(existingData);
                updateLevelUnlocking(existingData);
              }
            } else {
              console.error('Error creating progress record:', insertError);
            }
          } else {
            setUserProgress(newProgress);
            updateLevelUnlocking(newProgress);
          }
        } catch (error) {
          console.error('Unexpected error:', error);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLevelUnlocking = (progress) => {
    const currentProgress = progress || userProgress;
    console.log('Updating level unlocking with progress:', currentProgress);
    
    setLevels(prevLevels => 
      prevLevels.map(level => {
        // Level 1 should always be unlocked
        const isUnlocked = level.id === 1 || (currentProgress && level.required_score <= (currentProgress.total_score || 0));
        console.log(`Level ${level.id}: required ${level.required_score}, current ${currentProgress?.total_score || 0}, unlocked: ${isUnlocked}`);
        return {
          ...level,
          unlocked: isUnlocked
        };
      })
    );
  };

  const handleTaskClick = (levelId, taskId) => {
    // Check if level is unlocked (Level 1 is always unlocked)
    const level = levels.find(l => l.id === levelId);
    if (!level?.unlocked && levelId !== 1) return;

    console.log(`Navigating to task: Level ${levelId}, Task ${taskId}`);
    // Navigate to task page
    navigate(`/learning/${levelId}/${taskId}`);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return <div className="loading">Loading your progress...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Welcome, {user?.email}!</h1>
          <div className="header-stats">
            <span className="stat-item">Score: {userProgress?.total_score || 0}</span>
            <span className="stat-item">Level: {userProgress?.current_level || 1}</span>
            <span className="stat-item">Tasks: {userProgress?.completed_tasks || 0}</span>
          </div>
        </div>
        <button onClick={handleSignOut} className="sign-out-btn">
          Sign Out
        </button>
      </header>

      <div className="game-board">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '25%' }}></div>
        </div>
        
        <div className="levels-container">
          {levels.map((level) => (
            <div key={level.id} className={`level ${(level.unlocked || level.id === 1) ? 'unlocked' : 'locked'}`}>
              <div className="level-header">
                <h3>{level.name}</h3>
                <span className="level-number">Level {level.id}</span>
              </div>
              
              <div className="tasks-grid">
                {tasks
                  .filter(task => {
                    console.log(`Task ${task.task_id} level_id: ${task.level_id}, Level ${level.id} id: ${level.id}`);
                    return task.level_id === level.id;
                  })
                  .map((task, index) => {
                    const isCompleted = completedTasks.includes(`${level.id}-${task.task_id}`);
                    return (
                      <div
                        key={task.id}
                        className={`task-card ${isCompleted ? 'completed' : (level.unlocked || level.id === 1) ? 'available' : 'locked'}`}
                        onClick={() => {
                          console.log(`Task clicked: Level ${level.id}, Task ${task.task_id}, Unlocked: ${level.unlocked}, Completed: ${isCompleted}`);
                          if ((level.unlocked || level.id === 1) && !isCompleted) {
                            handleTaskClick(level.id, task.task_id);
                          }
                        }}
                      >
                        <div className="task-icon">
                          {isCompleted ? '✅' : (task.task_type === 'video' ? '🎥' : '📝')}
                        </div>
                        <div className="task-name">
                          {task.title}
                        </div>
                        <div className="task-number">
                          {isCompleted ? '✓' : index + 1}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-panel">
        <div className="stat">
          <span className="stat-label">Score</span>
          <span className="stat-value">{userProgress?.total_score || 0}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Completed</span>
          <span className="stat-value">{userProgress?.completed_tasks || 0}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Level</span>
          <span className="stat-value">{userProgress?.current_level || 1}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
