
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { getFoods, addMealEntry } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const FoodDetail: React.FC = () => {
  const { foodId } = useParams<{ foodId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [quantity, setQuantity] = useState(1);
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [isLogging, setIsLogging] = useState(false);
  
  const { data: foods = [], isLoading } = useQuery({
    queryKey: ['foods'],
    queryFn: getFoods
  });
  
  const food = foods.find(f => f.id === foodId);

  const handleLogFood = async () => {
    if (!user) {
      toast.error('Please log in to track nutrition');
      navigate('/login');
      return;
    }
    
    try {
      setIsLogging(true);
      
      await addMealEntry({
        userId: user.id,
        foodId: food!.id,
        date: new Date().toISOString().split('T')[0],
        mealType,
        quantity
      });
      
      toast.success('Food logged successfully!');
      navigate('/nutrition');
    } catch (error) {
      console.error('Error logging food:', error);
      toast.error('Failed to log food');
    } finally {
      setIsLogging(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">Food not found</p>
        <button 
          onClick={() => navigate('/nutrition')}
          className="fitness-btn-primary mt-4"
        >
          Back to Foods
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="relative">
        <div className="h-40 bg-gradient-to-r from-fitness-accent to-fitness-primary"></div>
        <button 
          onClick={() => navigate('/nutrition')}
          className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md"
        >
          <ArrowLeft size={20} />
        </button>
      </div>
      
      <div className="-mt-10 bg-white rounded-t-3xl p-4 relative z-10">
        <h1 className="text-2xl font-bold mb-1">{food.name}</h1>
        <p className="text-sm text-gray-500 capitalize mb-6">
          {food.category} • {food.servingSize}
        </p>
        
        <div className="fitness-card mb-6">
          <h3 className="font-bold mb-3">Nutrition Facts</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Calories</span>
              <span>{food.calories * quantity}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Protein</span>
              <span>{(food.protein * quantity).toFixed(1)}g</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Carbohydrates</span>
              <span>{(food.carbs * quantity).toFixed(1)}g</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium">Fat</span>
              <span>{(food.fat * quantity).toFixed(1)}g</span>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4 mt-4">
          <h3 className="font-bold mb-4">Log This Food</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meal Type
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setMealType(type)}
                    className={`py-2 px-2 rounded-lg border text-center capitalize text-sm ${
                      mealType === type
                        ? 'bg-fitness-primary text-white border-fitness-primary'
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity (servings)
              </label>
              <div className="flex">
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(0.5, prev - 0.5))}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-l-lg"
                >
                  -
                </button>
                <input
                  type="number"
                  min={0.5}
                  step={0.5}
                  value={quantity}
                  onChange={(e) => setQuantity(parseFloat(e.target.value) || 1)}
                  className="fitness-input border-l-0 border-r-0 rounded-none text-center"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(prev => prev + 0.5)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t max-w-md mx-auto">
        <button
          onClick={handleLogFood}
          disabled={isLogging}
          className="fitness-btn-primary w-full"
        >
          {isLogging ? 'Logging...' : 'Log Food'}
        </button>
      </div>
    </div>
  );
};

export default FoodDetail;
