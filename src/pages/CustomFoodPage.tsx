
import React from 'react';
import CustomFood from '@/components/Nutrition/CustomFood';
import MobileLayout from '@/components/Layout/MobileLayout';

const CustomFoodPage: React.FC = () => {
  return (
    <MobileLayout>
      <CustomFood />
    </MobileLayout>
  );
};

export default CustomFoodPage;
