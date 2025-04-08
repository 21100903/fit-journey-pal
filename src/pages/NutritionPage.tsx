
import React from 'react';
import MobileLayout from '@/components/Layout/MobileLayout';
import FoodList from '@/components/Nutrition/FoodList';

const NutritionPage: React.FC = () => {
  return (
    <MobileLayout>
      <div className="bg-fitness-primary text-white p-4">
        <h1 className="text-2xl font-bold">Nutrition</h1>
        <p className="text-sm text-white/80">Find and log your meals</p>
      </div>
      <FoodList />
    </MobileLayout>
  );
};

export default NutritionPage;
