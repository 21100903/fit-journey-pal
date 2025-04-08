
import React from 'react';
import { Clock, Zap, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Workout } from '@/data/mockData';

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const navigate = useNavigate();
  
  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  }[workout.difficulty];

  const handleClick = () => {
    navigate(`/workouts/${workout.id}`);
  };

  return (
    <div className="fitness-card" onClick={handleClick}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold">{workout.name}</h3>
        <ChevronRight size={18} className="text-gray-400" />
      </div>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{workout.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <span className="flex items-center text-xs text-gray-600">
            <Clock size={14} className="mr-1" />
            {workout.duration} min
          </span>
          <span className="flex items-center text-xs text-gray-600">
            <Zap size={14} className="mr-1" />
            {workout.caloriesBurn} cal
          </span>
        </div>
        
        <div className={`px-2 py-1 rounded-full text-xs ${difficultyColor}`}>
          {workout.difficulty}
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
