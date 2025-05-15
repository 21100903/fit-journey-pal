import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { addWorkoutEntry } from '@/data/mockData';
import { useQueryClient } from '@tanstack/react-query';
import WorkoutHeader from './WorkoutHeader';
import WorkoutForm from './WorkoutForm';
import ExerciseList from './ExerciseList';
import WorkoutActions from './WorkoutActions';
import { useWorkoutTimer } from '@/hooks/useWorkoutTimer';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  completed: boolean;
  timeSpent?: number;
  notes?: string;
  description: string;
}

interface CustomWorkoutForm {
  name: string;
  description: string;
  exercises: Exercise[];
}

const CustomWorkout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);

  const {
    workoutActive,
    workoutTimeSpent,
    elapsedTime,
    exerciseStartTime,
    setExerciseStartTime,
    startWorkout,
    stopWorkout,
    formatTime
  } = useWorkoutTimer();

  const form = useForm<CustomWorkoutForm>({
    defaultValues: {
      name: '',
      description: '',
      exercises: []
    }
  });

  const exercises = form.watch('exercises') || [];

  const addExercise = () => {
    const currentExercises = form.getValues('exercises') || [];
    form.setValue('exercises', [
      ...currentExercises,
      {
        id: Date.now().toString(),
        name: '',
        sets: 3,
        reps: 10,
        completed: false,
        description: ''
      }
    ]);
    
    // Add toast notification when exercise is added
    toast.success("New exercise added!", {
      description: `Exercise #${currentExercises.length + 1} has been added to your workout.`,
      duration: 3000
    });
  };

  const removeExercise = (id: string) => {
    const currentExercises = form.getValues('exercises') || [];
    form.setValue(
      'exercises',
      currentExercises.filter(ex => ex.id !== id)
    );
  };

  const updateExercise = (id: string, field: keyof Exercise, value: any) => {
    const currentExercises = form.getValues('exercises') || [];
    const updatedExercises = currentExercises.map(ex => 
      ex.id === id ? { ...ex, [field]: value } : ex
    );
    form.setValue('exercises', updatedExercises);
  };

  const startExercise = (id: string) => {
    if (activeExerciseId) {
      stopExercise(activeExerciseId);
    }
    
    setActiveExerciseId(id);
    setExerciseStartTime(Date.now());
    toast.success("Exercise started!");
  };

  const stopExercise = (id: string) => {
    if (!exerciseStartTime) return;
    
    const timeSpent = Math.floor((Date.now() - exerciseStartTime) / 1000); // in seconds
    updateExercise(id, 'timeSpent', timeSpent);
    updateExercise(id, 'completed', true);
    
    setActiveExerciseId(null);
    setExerciseStartTime(null);
    
    toast.success(`Exercise completed in ${timeSpent} seconds!`);
    
    // Move to next exercise if available
    const currentIndex = exercises.findIndex(ex => ex.id === id);
    if (currentIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentIndex + 1);
    }
  };

  const handleStartWorkout = () => {
    if (!form.getValues('name')) {
      toast.error("Please enter a workout name");
      return;
    }
    
    if (exercises.length === 0) {
      toast.error("Please add at least one exercise");
      return;
    }
    
    startWorkout();
    setCurrentExerciseIndex(0);
    toast.success("Workout started!");
  };

  const handleStopWorkout = () => {
    stopWorkout();
    setWorkoutCompleted(true);
    
    // Stop any active exercise
    if (activeExerciseId) {
      stopExercise(activeExerciseId);
    }
    
    toast.success(`Workout completed in ${workoutTimeSpent} minutes!`);
  };

  const saveWorkout = async () => {
    if (!user) {
      toast.error("Please log in to save workouts");
      navigate('/login');
      return;
    }

    if (!form.getValues('name')) {
      toast.error("Please enter a workout name");
      return;
    }
    
    if (exercises.length === 0) {
      toast.error("Please add at least one exercise");
      return;
    }

    try {
      // Create a custom workout entry with all required Workout properties
      const workoutData = {
        userId: user.id,
        workoutId: 'custom-' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        duration: workoutTimeSpent || 0,
        intensity: 'medium' as const,
        notes: form.getValues('description'),
        // Create the workout object that's part of WorkoutEntry
        customWorkout: {
          id: 'custom-' + Date.now(),
          name: form.getValues('name'),
          description: form.getValues('description') || 'Custom workout',
          exercises: exercises.map(exercise => ({
            ...exercise,
            description: exercise.description || `${exercise.name} - ${exercise.sets} sets of ${exercise.reps} reps` // Ensure every exercise has a description
          })),
          duration: workoutTimeSpent || 0,
          caloriesBurn: (workoutTimeSpent || 0) * 5, // Rough estimate: 5 calories per minute
          // Add the missing required Workout properties with correct types
          category: 'custom',
          difficulty: 'intermediate' as 'beginner' | 'intermediate' | 'advanced',
          instructions: ['Custom workout created by user']
        }
      };
      
      await addWorkoutEntry(workoutData);
      
      // Invalidate the queries to refresh workout list
      queryClient.invalidateQueries({ queryKey: ['workoutEntries'] });
      
      toast.success("Workout saved successfully!");
      navigate('/workouts');
    } catch (error) {
      console.error('Error saving workout:', error);
      toast.error("Failed to save workout. Please try again.");
    }
  };

  return (
    <div className="pb-24">
      <WorkoutHeader 
        workoutActive={workoutActive} 
        elapsedTime={elapsedTime} 
        formatTime={formatTime} 
        onBackClick={() => navigate('/workouts')} 
      />
      
      <div className="-mt-10 bg-white rounded-t-3xl p-4 relative z-10">
        <h1 className="text-2xl font-bold mb-4">
          {workoutCompleted ? "Workout Summary" : "Create Custom Workout"}
        </h1>
        
        <WorkoutForm 
          form={form} 
          workoutActive={workoutActive} 
          workoutCompleted={workoutCompleted} 
          workoutTimeSpent={workoutTimeSpent}
        />
        
        <ExerciseList 
          exercises={exercises} 
          workoutActive={workoutActive} 
          workoutCompleted={workoutCompleted} 
          currentExerciseIndex={currentExerciseIndex}
          activeExerciseId={activeExerciseId}
          onAddExercise={addExercise}
          onRemoveExercise={removeExercise}
          onUpdateExercise={updateExercise}
          onStartExercise={startExercise}
          onStopExercise={stopExercise}
        />
      </div>
      
      <WorkoutActions 
        workoutActive={workoutActive} 
        workoutCompleted={workoutCompleted} 
        onStartWorkout={handleStartWorkout}
        onStopWorkout={handleStopWorkout}
        onSaveWorkout={saveWorkout}
        onCancel={() => navigate('/workouts')}
        hasName={!!form.getValues('name')}
        hasExercises={exercises.length > 0}
      />
    </div>
  );
};

export default CustomWorkout;
