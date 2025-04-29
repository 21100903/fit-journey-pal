
import React from 'react';
import MobileLayout from '@/components/Layout/MobileLayout';
import MealHistory from '@/components/Nutrition/MealHistory';

const MealHistoryPage: React.FC = () => {
  return (
    <MobileLayout>
      <div className="bg-fitness-primary text-white p-4">
        <h1 className="text-2xl font-bold">Meal History</h1>
        <p className="text-sm text-white/80">Your logged meals</p>
      </div>
      <MealHistory />
    </MobileLayout>
  );
};

export default MealHistoryPage;
