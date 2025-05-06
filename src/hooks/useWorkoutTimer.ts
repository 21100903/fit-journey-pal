
import { useState, useEffect } from 'react';

export const useWorkoutTimer = () => {
  const [workoutActive, setWorkoutActive] = useState(false);
  const [workoutStartTime, setWorkoutStartTime] = useState<number | null>(null);
  const [workoutTimeSpent, setWorkoutTimeSpent] = useState<number | null>(null);
  const [exerciseStartTime, setExerciseStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // Timer effect for workout
  useEffect(() => {
    let timer: number | undefined;
    
    if (workoutActive && workoutStartTime) {
      timer = window.setInterval(() => {
        const elapsed = Math.floor((Date.now() - workoutStartTime) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
    }
    
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [workoutActive, workoutStartTime]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startWorkout = () => {
    setWorkoutActive(true);
    setWorkoutStartTime(Date.now());
  };

  const stopWorkout = () => {
    if (workoutStartTime) {
      const timeSpent = Math.floor((Date.now() - workoutStartTime) / 1000 / 60); // in minutes
      setWorkoutTimeSpent(timeSpent);
      setWorkoutActive(false);
    }
  };

  return {
    workoutActive,
    workoutStartTime,
    workoutTimeSpent,
    elapsedTime,
    exerciseStartTime,
    setExerciseStartTime,
    startWorkout,
    stopWorkout,
    formatTime
  };
};
