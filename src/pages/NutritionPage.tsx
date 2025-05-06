
import React from 'react';
import MobileLayout from '@/components/Layout/MobileLayout';
import FoodList from '@/components/Nutrition/FoodList';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NutritionPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <MobileLayout>
      <div className="bg-fitness-primary text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Nutrition</h1>
            <p className="text-sm text-white/80">Track your food and calories</p>
          </div>
          <Button 
            onClick={() => navigate('/custom-food')}
            className="bg-white/20 text-white rounded-full p-2 hover:bg-white/30"
            size="icon"
            variant="ghost"
          >
            <Plus size={20} />
          </Button>
        </div>
      </div>
      <FoodList />
    </MobileLayout>
  );
};

export default NutritionPage;
