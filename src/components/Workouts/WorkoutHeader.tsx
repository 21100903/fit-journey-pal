
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface WorkoutHeaderProps {
  workoutActive: boolean;
  elapsedTime: number;
  formatTime: (seconds: number) => string;
  onBackClick: () => void;
}

const WorkoutHeader: React.FC<WorkoutHeaderProps> = ({ 
  workoutActive, 
  elapsedTime, 
  formatTime, 
  onBackClick 
}) => {
  return (
    <div className="relative">
      <div className="h-40 bg-gradient-to-r from-fitness-primary to-fitness-accent">
        {workoutActive && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-white font-bold text-xl">
            {formatTime(elapsedTime)}
          </div>
        )}
      </div>
      <button 
        onClick={onBackClick}
        className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md"
      >
        <ArrowLeft size={20} />
      </button>
    </div>
  );
};

export default WorkoutHeader;
