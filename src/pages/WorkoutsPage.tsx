
import React from 'react';
import MobileLayout from '@/components/Layout/MobileLayout';
import WorkoutList from '@/components/Workouts/WorkoutList';

const WorkoutsPage: React.FC = () => {
  return (
    <MobileLayout>
      <div className="bg-fitness-primary text-white p-4">
        <h1 className="text-2xl font-bold">Workouts</h1>
        <p className="text-sm text-white/80">Find and log your exercise routines</p>
      </div>
      <WorkoutList />
    </MobileLayout>
  );
};

export default WorkoutsPage;
