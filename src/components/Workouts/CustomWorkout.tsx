
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Clock, 
  Trash2, 
  PlayCircle,
  StopCircle,
  Edit,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { addWorkoutEntry } from '@/data/mockData';
import { useQueryClient } from '@tanstack/react-query';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  completed: boolean;
  timeSpent?: number;
  notes?: string;
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
  const [exerciseStartTime, setExerciseStartTime] = useState<number | null>(null);
  const [workoutActive, setWorkoutActive] = useState(false);
  const [workoutStartTime, setWorkoutStartTime] = useState<number | null>(null);
  const [workoutTimeSpent, setWorkoutTimeSpent] = useState<number | null>(null);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const form = useForm<CustomWorkoutForm>({
    defaultValues: {
      name: '',
      description: '',
      exercises: []
    }
  });

  const exercises = form.watch('exercises') || [];

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

  const addExercise = () => {
    const currentExercises = form.getValues('exercises') || [];
    form.setValue('exercises', [
      ...currentExercises,
      {
        id: Date.now().toString(),
        name: '',
        sets: 3,
        reps: 10,
        completed: false
      }
    ]);
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

  const startWorkout = () => {
    if (!form.getValues('name')) {
      toast.error("Please enter a workout name");
      return;
    }
    
    if (exercises.length === 0) {
      toast.error("Please add at least one exercise");
      return;
    }
    
    setWorkoutActive(true);
    setWorkoutStartTime(Date.now());
    setCurrentExerciseIndex(0);
    toast.success("Workout started!");
  };

  const stopWorkout = () => {
    if (workoutStartTime) {
      const timeSpent = Math.floor((Date.now() - workoutStartTime) / 1000 / 60); // in minutes
      setWorkoutTimeSpent(timeSpent);
      setWorkoutActive(false);
      setWorkoutCompleted(true);
      toast.success(`Workout completed in ${timeSpent} minutes!`);

      // Stop any active exercise
      if (activeExerciseId) {
        stopExercise(activeExerciseId);
      }
    }
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
          exercises: exercises,
          duration: workoutTimeSpent || 0,
          caloriesBurn: (workoutTimeSpent || 0) * 5, // Rough estimate: 5 calories per minute
          // Add the missing required Workout properties
          category: 'custom',
          difficulty: 'intermediate',
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
      <div className="relative">
        <div className="h-40 bg-gradient-to-r from-fitness-primary to-fitness-accent">
          {workoutActive && (
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-white font-bold text-xl">
              {formatTime(elapsedTime)}
            </div>
          )}
        </div>
        <button 
          onClick={() => navigate('/workouts')}
          className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md"
        >
          <ArrowLeft size={20} />
        </button>
      </div>
      
      <div className="-mt-10 bg-white rounded-t-3xl p-4 relative z-10">
        <h1 className="text-2xl font-bold mb-4">
          {workoutCompleted ? "Workout Summary" : "Create Custom Workout"}
        </h1>
        
        <form>
          <div className="space-y-4">
            {!workoutActive && !workoutCompleted && (
              <>
                <div>
                  <Label htmlFor="name">Workout Name</Label>
                  <Input
                    id="name"
                    {...form.register('name')}
                    placeholder="My Custom Workout"
                    disabled={workoutActive}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    {...form.register('description')}
                    placeholder="Describe your workout"
                    disabled={workoutActive}
                  />
                </div>
              </>
            )}
            
            {workoutCompleted && (
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-green-800">
                    Workout Complete!
                  </h3>
                  <div className="flex items-center text-green-800">
                    <Clock size={16} className="mr-1" />
                    <span>{workoutTimeSpent} minutes</span>
                  </div>
                </div>
                <p className="text-green-600 text-sm mt-1">
                  Great job completing your workout!
                </p>
              </div>
            )}
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">Exercises</h3>
                {!workoutActive && !workoutCompleted && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={addExercise}
                    className="flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Exercise
                  </Button>
                )}
              </div>
              
              {exercises.length === 0 ? (
                <p className="text-gray-500 text-sm italic">
                  No exercises added yet. Click "Add Exercise" to begin.
                </p>
              ) : (
                <div className="space-y-4">
                  {exercises.map((exercise, index) => (
                    <div
                      key={exercise.id}
                      className={`border rounded-lg p-3 ${
                        exercise.completed ? "bg-gray-50" : ""
                      } ${activeExerciseId === exercise.id ? "border-green-500" : ""} ${
                        workoutActive && currentExerciseIndex === index && !exercise.completed ? "border-blue-500 border-2" : ""
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 ${
                            exercise.completed ? "bg-green-500 text-white" : "bg-fitness-primary text-white"
                          }`}>
                            {exercise.completed ? <Check size={12} /> : index + 1}
                          </span>
                          {!workoutActive && !workoutCompleted ? (
                            <Input
                              value={exercise.name}
                              onChange={(e) => updateExercise(exercise.id, 'name', e.target.value)}
                              placeholder="Exercise name"
                              className="border-0 p-0 h-auto text-base font-medium"
                            />
                          ) : (
                            <span className="font-medium">{exercise.name}</span>
                          )}
                        </div>
                        
                        {!workoutActive && !workoutCompleted ? (
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeExercise(exercise.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        ) : workoutActive && !exercise.completed ? (
                          currentExerciseIndex === index ? (
                            activeExerciseId === exercise.id ? (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => stopExercise(exercise.id)}
                                className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                              >
                                <StopCircle size={16} className="mr-1" />
                                Complete
                              </Button>
                            ) : (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => startExercise(exercise.id)}
                                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                              >
                                <PlayCircle size={16} className="mr-1" />
                                Start
                              </Button>
                            )
                          ) : null
                        ) : null}
                      </div>
                      
                      {!workoutActive && !workoutCompleted ? (
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <div>
                            <Label className="text-xs text-gray-500">Sets</Label>
                            <Input
                              type="number"
                              min="1"
                              value={exercise.sets}
                              onChange={(e) => updateExercise(exercise.id, 'sets', parseInt(e.target.value) || 0)}
                              className="h-8"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">Reps</Label>
                            <Input
                              type="number"
                              min="1"
                              value={exercise.reps}
                              onChange={(e) => updateExercise(exercise.id, 'reps', parseInt(e.target.value) || 0)}
                              className="h-8"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">Weight (opt)</Label>
                            <Input
                              type="number"
                              min="0"
                              value={exercise.weight || ''}
                              onChange={(e) => updateExercise(exercise.id, 'weight', parseInt(e.target.value) || 0)}
                              className="h-8"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex space-x-4 text-sm text-gray-600">
                            <span>{exercise.sets} sets</span>
                            <span>{exercise.reps} reps</span>
                            {exercise.weight ? <span>{exercise.weight} lbs</span> : null}
                          </div>
                          
                          {exercise.completed && (
                            <div className="mt-2 text-sm flex justify-between">
                              <span className="text-green-600 font-medium flex items-center">
                                Completed
                              </span>
                              {exercise.timeSpent && (
                                <span className="text-gray-600 flex items-center">
                                  <Clock size={14} className="mr-1" />
                                  {exercise.timeSpent} seconds
                                </span>
                              )}
                            </div>
                          )}
                          
                          {workoutCompleted && (
                            <div className="mt-2">
                              <Label className="text-xs text-gray-500">Notes</Label>
                              <Textarea
                                placeholder="How did this exercise feel?"
                                value={exercise.notes || ''}
                                onChange={(e) => updateExercise(exercise.id, 'notes', e.target.value)}
                                className="text-sm"
                                rows={2}
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t max-w-md mx-auto">
        {!workoutActive && !workoutCompleted ? (
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/workouts')}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={startWorkout}
              disabled={!form.getValues('name') || exercises.length === 0}
            >
              Start Workout
            </Button>
          </div>
        ) : workoutActive ? (
          <Button
            type="button"
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={stopWorkout}
          >
            <StopCircle className="mr-2" />
            Complete Workout
          </Button>
        ) : (
          <Button
            type="button"
            className="w-full"
            onClick={saveWorkout}
          >
            Save Workout
          </Button>
        )}
      </div>
    </div>
  );
};

export default CustomWorkout;
