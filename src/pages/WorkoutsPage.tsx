
import React from 'react';
import MobileLayout from '@/components/Layout/MobileLayout';
import WorkoutList from '@/components/Workouts/WorkoutList';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WorkoutsPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <MobileLayout>
      <div className="bg-fitness-primary text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Workouts</h1>
            <p className="text-sm text-white/80">Find and log your exercise routines</p>
          </div>
          <button 
            onClick={() => navigate('/custom-workout')}
            className="bg-white/20 text-white rounded-full p-2 hover:bg-white/30"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      <WorkoutList />
    </MobileLayout>
  );
};

export default WorkoutsPage;
