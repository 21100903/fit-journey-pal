
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  ArrowLeft, 
  Clock, 
  Zap, 
  ListChecks, 
  CheckCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { getWorkouts, addWorkoutEntry } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const WorkoutDetail: React.FC = () => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(true);
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [duration, setDuration] = useState<number | ''>('');
  const [notes, setNotes] = useState('');
  const [isLogging, setIsLogging] = useState(false);
  
  const { data: workouts = [], isLoading } = useQuery({
    queryKey: ['workouts'],
    queryFn: getWorkouts
  });
  
  const workout = workouts.find(w => w.id === workoutId);

  const handleLogWorkout = async () => {
    if (!user) {
      toast.error('Please log in to track workouts');
      navigate('/login');
      return;
    }
    
    if (!duration) {
      toast.error('Please enter workout duration');
      return;
    }
    
    try {
      setIsLogging(true);
      
      await addWorkoutEntry({
        userId: user.id,
        workoutId: workout!.id,
        date: new Date().toISOString().split('T')[0],
        duration: Number(duration),
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
        
        <p className="text-gray-600 mb-6">{workout.description}</p>
        
        <div className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => setExpanded(!expanded)}
          >
            <div className="flex items-center">
              <ListChecks size={18} className="mr-2 text-fitness-primary" />
              <h3 className="font-bold">Instructions</h3>
            </div>
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          
          {expanded && (
            <ul className="mt-3 space-y-2">
              {workout.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <CheckCircle size={18} className="mr-2 text-fitness-success shrink-0 mt-0.5" />
                  <p className="text-sm">{instruction}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="border-t pt-4 mt-4">
          <h3 className="font-bold mb-4">Log This Workout</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (minutes)
              </label>
              <input
                type="number"
                min={1}
                value={duration}
                onChange={(e) => setDuration(e.target.value ? Number(e.target.value) : '')}
                className="fitness-input"
                placeholder={workout.duration.toString()}
              />
            </div>
            
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
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="fitness-input"
                placeholder="How did it go? Any achievements?"
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t max-w-md mx-auto">
        <button
          onClick={handleLogWorkout}
          disabled={isLogging || !duration}
          className="fitness-btn-primary w-full"
        >
          {isLogging ? 'Logging...' : 'Log Workout'}
        </button>
      </div>
    </div>
  );
};

export default WorkoutDetail;
