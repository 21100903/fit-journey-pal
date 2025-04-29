
import React from 'react';
import WorkoutDetail from '@/components/Workouts/WorkoutDetail';
import MobileLayout from '@/components/Layout/MobileLayout';

const WorkoutDetailPage: React.FC = () => {
  return (
    <MobileLayout>
      <WorkoutDetail />
    </MobileLayout>
  );
};

export default WorkoutDetailPage;
