import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from "../utils/supabase.ts";
import VideoTask from './VideoTask';
import QuizTask from './QuizTask';
import './LearningPage.css';

const LearningPage = () => {
  const { levelId, taskId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('LearningPage mounted with params:', { levelId, taskId, user: user?.email });
    if (user && levelId && taskId) {
      fetchTaskData();
    }
  }, [user, levelId, taskId]);

  const fetchTaskData = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('task_id', taskId)
        .eq('level_id', levelId)
        .single();

      if (error) {
        console.error('Error fetching task data:', error);
        setTaskData(null);
      } else if (data) {
        const taskData = {
          id: data.task_id,
          level: data.level_id,
          type: data.task_type,
          title: data.title,
          description: data.description,
          content: data.content
        };
        setTaskData(taskData);
      }
    } catch (error) {
      console.error('Error:', error);
      setTaskData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskComplete = async (score) => {
    try {
      // First, get current progress
      const { data: currentProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      const currentScore = currentProgress?.total_score || 0;
      const currentTasks = currentProgress?.completed_tasks || 0;

        // Update user progress in database
        const { error } = await supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            completed_tasks: currentTasks + 1,
            total_score: currentScore + score,
            last_completed_task: taskId,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_id'
          });

      if (error) {
        console.error('Error updating progress:', error);
      } else {
        // Also record the task completion (use upsert to handle duplicates)
        const { error: taskError } = await supabase
          .from('task_completions')
          .upsert({
            user_id: user.id,
            level_id: parseInt(levelId),
            task_id: taskId,
            task_type: taskData.type,
            score: score,
            completed_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,level_id,task_id'
          });

        if (taskError) {
          console.error('Error recording task completion:', taskError);
        }

        // Navigate back to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading task...</div>;
  }

  if (!taskData) {
    return <div className="error">Task not found</div>;
  }

  return (
    <div className="learning-page">
      <header className="learning-header">
        <button onClick={() => navigate('/dashboard')} className="back-btn">
          ← Back to Dashboard
        </button>
        <h1>{taskData.title}</h1>
        <div className="task-info">
          Level {levelId} • {taskData.type === 'video' ? 'Video' : 'Quiz'}
        </div>
      </header>

      <div className="task-content">
        {taskData.type === 'video' ? (
          <VideoTask 
            taskData={taskData} 
            onComplete={handleTaskComplete}
          />
        ) : (
          <QuizTask 
            taskData={taskData} 
            onComplete={handleTaskComplete}
          />
        )}
      </div>
    </div>
  );
};

export default LearningPage;