
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Utensils, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { 
  getUserMealEntries, 
  getUserWorkoutEntries, 
  MealEntry, 
  WorkoutEntry
} from '@/data/mockData';

const DashboardSummary: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const { data: mealEntries = [] } = useQuery({
    queryKey: ['mealEntries', user?.id, today],
    queryFn: () => getUserMealEntries(user?.id || ''),
    enabled: !!user?.id,
  });

  const { data: workoutEntries = [] } = useQuery({
    queryKey: ['workoutEntries', user?.id, today],
    queryFn: () => getUserWorkoutEntries(user?.id || ''),
    enabled: !!user?.id,
  });

  // Calculate nutrition totals for today
  const calculateNutritionTotals = (entries: MealEntry[]) => {
    return entries.reduce((totals, entry) => {
      const { food, quantity } = entry;
      return {
        calories: totals.calories + (food.calories * quantity),
        protein: totals.protein + (food.protein * quantity),
        carbs: totals.carbs + (food.carbs * quantity),
        fat: totals.fat + (food.fat * quantity)
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  // Calculate workout totals for today
  const calculateWorkoutTotals = (entries: WorkoutEntry[]) => {
    return entries.reduce((totals, entry) => {
      const { workout, duration } = entry;
      // Adjust calories based on duration ratio
      const caloriesBurned = (workout.caloriesBurn / workout.duration) * duration;
      
      return {
        duration: totals.duration + duration,
        caloriesBurned: totals.caloriesBurned + caloriesBurned
      };
    }, { duration: 0, caloriesBurned: 0 });
  };

  const nutritionTotals = calculateNutritionTotals(mealEntries);
  const workoutTotals = calculateWorkoutTotals(workoutEntries);
  
  // Calculate net calories
  const netCalories = nutritionTotals.calories - workoutTotals.caloriesBurned;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Today's Summary</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div 
          className="fitness-card bg-fitness-primary/10 cursor-pointer"
          onClick={() => navigate('/nutrition')}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Nutrition</h3>
            <Utensils className="text-fitness-primary" size={18} />
          </div>
          <p className="text-2xl font-bold">{nutritionTotals.calories.toFixed(0)}</p>
          <p className="text-xs text-gray-600">calories consumed</p>
        </div>
        
        <div 
          className="fitness-card bg-fitness-accent/10 cursor-pointer"
          onClick={() => navigate('/workouts')}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Workouts</h3>
            <Activity className="text-fitness-accent" size={18} />
          </div>
          <p className="text-2xl font-bold">{workoutTotals.caloriesBurned.toFixed(0)}</p>
          <p className="text-xs text-gray-600">calories burned</p>
        </div>
      </div>
      
      <div className="fitness-card mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Net Calories</h3>
          <TrendingUp size={18} className={netCalories < 2000 ? "text-fitness-success" : "text-fitness-error"} />
        </div>
        <p className="text-2xl font-bold">{netCalories.toFixed(0)}</p>
        <p className="text-xs text-gray-600">
          calories consumed - calories burned
        </p>
        
        <div className="mt-3 pt-3 border-t grid grid-cols-3 gap-1 text-center">
          <div>
            <p className="text-sm font-medium">{nutritionTotals.protein.toFixed(0)}g</p>
            <p className="text-xs text-gray-600">Protein</p>
          </div>
          <div>
            <p className="text-sm font-medium">{nutritionTotals.carbs.toFixed(0)}g</p>
            <p className="text-xs text-gray-600">Carbs</p>
          </div>
          <div>
            <p className="text-sm font-medium">{nutritionTotals.fat.toFixed(0)}g</p>
            <p className="text-xs text-gray-600">Fat</p>
          </div>
        </div>
      </div>
      
      <div className="fitness-card">
        <h3 className="font-medium mb-2">Recent Activity</h3>
        {workoutEntries.length > 0 ? (
          <div>
            {workoutEntries.map((entry) => (
              <div key={entry.id} className="flex items-center py-2 border-b last:border-0">
                <div className="bg-fitness-primary/10 p-2 rounded-lg mr-3">
                  <Dumbbell className="text-fitness-primary" size={16} />
                </div>
                <div>
                  <p className="font-medium text-sm">{entry.workout.name}</p>
                  <p className="text-xs text-gray-600">{entry.duration} min • {entry.intensity} intensity</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No workouts logged today. Start one!</p>
        )}
        <button 
          onClick={() => navigate('/add')}
          className="mt-3 fitness-btn-outline text-sm w-full"
        >
          Log New Activity
        </button>
      </div>
    </div>
  );
};

export default DashboardSummary;

import { Dumbbell } from 'lucide-react';
