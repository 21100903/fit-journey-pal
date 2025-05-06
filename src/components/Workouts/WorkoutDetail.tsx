
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  ArrowLeft, 
  Clock, 
  Zap, 
  ListChecks, 
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Play,
  StopCircle
} from 'lucide-react';
import { getWorkouts, addWorkoutEntry } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const WorkoutDetail: React.FC = () => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(true);
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [notes, setNotes] = useState('');
  const [isLogging, setIsLogging] = useState(false);
  
  // Workout session state
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseStatus, setExerciseStatus] = useState<{[key: string]: boolean}>({});
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  
  const { data: workouts = [], isLoading } = useQuery({
    queryKey: ['workouts'],
    queryFn: getWorkouts
  });
  
  const workout = workouts.find(w => w.id === workoutId);

  // Initialize exercise status when workout data is loaded
  useEffect(() => {
    if (workout && workout.exercises) {
      const initialStatus = workout.exercises.reduce((acc: {[key: string]: boolean}, _, index) => {
        acc[index.toString()] = false;
        return acc;
      }, {});
      setExerciseStatus(initialStatus);
    }
  }, [workout]);
  
  // Timer effect
  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive) {
      interval = window.setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (interval) {
      window.clearInterval(interval);
    }
    
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isActive]);
  
  // Check if all exercises are completed
  useEffect(() => {
    if (workout && workout.exercises && isActive) {
      const allCompleted = workout.exercises.every((_, index) => exerciseStatus[index.toString()]);
      if (allCompleted) {
        setWorkoutCompleted(true);
        handleStop();
      }
    }
  }, [exerciseStatus, workout, isActive]);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleStart = () => {
    setIsActive(true);
    setStartTime(new Date());
    toast.success("Workout started!");
  };
  
  const handleStop = () => {
    setIsActive(false);
    if (startTime) {
      const elapsedMinutes = Math.round((new Date().getTime() - startTime.getTime()) / 60000);
      toast.info(`Workout completed in ${elapsedMinutes} minutes`);
    }
  };

  const completeExercise = (index: number) => {
    setExerciseStatus(prev => ({
      ...prev,
      [index]: true
    }));
    
    // If there's a next exercise, set it as current
    if (workout && workout.exercises && index < workout.exercises.length - 1) {
      setCurrentExerciseIndex(index + 1);
    } else {
      // All exercises completed
      setWorkoutCompleted(true);
      handleStop();
    }
  };

  const handleLogWorkout = async () => {
    if (!user) {
      toast.error('Please log in to track workouts');
      navigate('/login');
      return;
    }
    
    try {
      setIsLogging(true);
      
      const duration = startTime 
        ? Math.round((new Date().getTime() - startTime.getTime()) / 60000)
        : workout?.duration || 0;
      
      await addWorkoutEntry({
        userId: user.id,
        workoutId: workout!.id,
        date: new Date().toISOString().split('T')[0],
        duration: duration,
        intensity,
        notes: notes || undefined
      });
      
      toast.success('Workout logged successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error logging workout:', error);
      toast.error('Failed to log workout');
    } finally {
      setIsLogging(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">Workout not found</p>
        <button 
          onClick={() => navigate('/workouts')}
          className="fitness-btn-primary mt-4"
        >
          Back to Workouts
        </button>
      </div>
    );
  }

  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  }[workout.difficulty];

  return (
    <div className="pb-24">
      <div className="relative">
        <div className="h-40 bg-gradient-to-r from-fitness-primary to-fitness-accent"></div>
        <button 
          onClick={() => navigate('/workouts')}
          className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md"
        >
          <ArrowLeft size={20} />
        </button>
      </div>
      
      <div className="-mt-10 bg-white rounded-t-3xl p-4 relative z-10">
        <h1 className="text-2xl font-bold mb-2">{workout.name}</h1>
        
        <div className="flex space-x-3 mb-4">
          <span className={`px-2 py-1 rounded-full text-xs ${difficultyColor}`}>
            {workout.difficulty}
          </span>
          <span className="flex items-center text-xs text-gray-600">
            <Clock size={14} className="mr-1" />
            {workout.duration} min
          </span>
          <span className="flex items-center text-xs text-gray-600">
            <Zap size={14} className="mr-1" />
            {workout.caloriesBurn} cal
          </span>
        </div>
        
        {/* Timer display */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center mb-3">
            <span className="text-2xl font-mono font-bold">{formatTime(time)}</span>
          </div>
          
          {!isActive && !workoutCompleted ? (
            <Button 
              onClick={handleStart}
              className="w-full bg-fitness-success text-white"
              size="lg"
            >
              <Play size={18} className="mr-1" />
              Start Workout
            </Button>
          ) : isActive ? (
            <Button
              onClick={handleStop}
              className="w-full bg-red-500 text-white hover:bg-red-600"
              size="lg"
            >
              <StopCircle size={18} className="mr-1" />
              Stop Workout
            </Button>
          ) : null}
        </div>
        
        <p className="text-gray-600 mb-6">{workout.description}</p>
        
        {/* Exercise List */}
        <div className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer mb-3" 
            onClick={() => setExpanded(!expanded)}
          >
            <div className="flex items-center">
              <ListChecks size={18} className="mr-2 text-fitness-primary" />
              <h3 className="font-bold">Exercises</h3>
            </div>
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          
          {expanded && (
            <ul className="mt-3 space-y-3">
              {workout.exercises.map((exercise, index) => (
                <li 
                  key={exercise.id} 
                  className={`p-3 border rounded-lg ${
                    isActive && currentExerciseIndex === index 
                      ? 'border-fitness-primary bg-fitness-primary bg-opacity-5' 
                      : 'border-gray-200'
                  } ${exerciseStatus[index] ? 'opacity-60' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`font-medium ${exerciseStatus[index] ? 'line-through text-gray-500' : ''}`}>
                      {exercise.name}
                    </h4>
                    <Checkbox 
                      checked={exerciseStatus[index]} 
                      onCheckedChange={() => {
                        if (isActive && currentExerciseIndex === index) {
                          completeExercise(index);
                        }
                      }}
                      disabled={!isActive || currentExerciseIndex !== index || exerciseStatus[index]}
                      className="h-5 w-5"
                    />
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
                  
                  <div className="flex flex-wrap gap-2 text-xs">
                    {exercise.sets && (
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {exercise.sets} sets
                      </span>
                    )}
                    {exercise.reps && (
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {exercise.reps} reps
                      </span>
                    )}
                    {exercise.duration && (
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {Math.floor(exercise.duration / 60) > 0 ? `${Math.floor(exercise.duration / 60)}m ` : ''}
                        {exercise.duration % 60 > 0 ? `${exercise.duration % 60}s` : ''}
                      </span>
                    )}
                  </div>
                  
                  {isActive && currentExerciseIndex === index && !exerciseStatus[index] && (
                    <Button 
                      onClick={() => completeExercise(index)}
                      className="w-full mt-3 bg-fitness-success"
                      size="sm"
                    >
                      <CheckCircle size={16} className="mr-1" />
                      Complete Exercise
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Log Section - Only show after workout completion */}
        {workoutCompleted && (
          <div className="border-t pt-4 mt-4">
            <h3 className="font-bold mb-4">Log Completed Workout</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Intensity
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'medium', 'high'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setIntensity(level)}
                      className={`py-2 px-4 rounded-lg border text-center capitalize ${
                        intensity === level
                          ? 'bg-fitness-primary text-white border-fitness-primary'
                          : 'bg-white text-gray-700 border-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (optional)
                </label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How did it go? Any achievements?"
                  className="fitness-input"
                  rows={3}
                />
              </div>
              
              <Button
                onClick={handleLogWorkout}
                disabled={isLogging}
                className="w-full bg-fitness-primary text-white"
                size="lg"
              >
                {isLogging ? 'Logging...' : 'Log Workout'}
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Fixed bottom button - Only show during active workout or before starting */}
      {!workoutCompleted && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t max-w-md mx-auto">
          {!isActive ? (
            <Button
              onClick={handleStart}
              className="w-full bg-fitness-success text-white"
              size="lg"
            >
              <Play size={18} className="mr-1" />
              Start Workout
            </Button>
          ) : (
            <Button
              onClick={handleStop}
              className="w-full bg-red-500 text-white hover:bg-red-600"
              size="lg"
            >
              <StopCircle size={18} className="mr-1" />
              Stop Workout
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkoutDetail;
