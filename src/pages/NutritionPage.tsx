
import React from 'react';
import MobileLayout from '@/components/Layout/MobileLayout';
import FoodList from '@/components/Nutrition/FoodList';
import { useNavigate } from 'react-router-dom';
import { ClockIcon } from 'lucide-react';

const NutritionPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <MobileLayout>
      <div className="bg-fitness-primary text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Nutrition</h1>
            <p className="text-sm text-white/80">Find and log your meals</p>
          </div>
          <button 
            onClick={() => navigate('/meals')}
            className="bg-white/20 text-white rounded-full p-2 hover:bg-white/30"
          >
            <ClockIcon size={20} />
          </button>
        </div>
      </div>
      <FoodList />
    </MobileLayout>
  );
};

export default NutritionPage;
