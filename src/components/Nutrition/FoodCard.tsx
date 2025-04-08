
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Food } from '@/data/mockData';

interface FoodCardProps {
  food: Food;
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/nutrition/${food.id}`);
  };

  return (
    <div className="fitness-card" onClick={handleClick}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">{food.name}</h3>
          <p className="text-xs text-gray-500 capitalize">{food.category} • {food.servingSize}</p>
        </div>
        <ChevronRight size={18} className="text-gray-400" />
      </div>
      
      <div className="mt-3 pt-3 border-t grid grid-cols-4 gap-1 text-center">
        <div>
          <p className="text-sm font-medium">{food.calories}</p>
          <p className="text-xs text-gray-600">cal</p>
        </div>
        <div>
          <p className="text-sm font-medium">{food.protein}g</p>
          <p className="text-xs text-gray-600">protein</p>
        </div>
        <div>
          <p className="text-sm font-medium">{food.carbs}g</p>
          <p className="text-xs text-gray-600">carbs</p>
        </div>
        <div>
          <p className="text-sm font-medium">{food.fat}g</p>
          <p className="text-xs text-gray-600">fat</p>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
