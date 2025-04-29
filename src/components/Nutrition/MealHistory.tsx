
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserMealEntries, MealEntry } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Apple, Coffee, Pizza, Salad } from 'lucide-react';

const getMealTypeIcon = (mealType: string) => {
  switch(mealType) {
    case 'breakfast':
      return Coffee;
    case 'lunch':
      return Salad;
    case 'dinner':
      return Pizza;
    default:
      return Apple; // snack
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
};

const MealHistory: React.FC = () => {
  const { user } = useAuth();
  
  const { data: mealEntries = [], isLoading } = useQuery({
    queryKey: ['mealEntries', user?.id],
    queryFn: () => getUserMealEntries(user?.id || ''),
    enabled: !!user?.id,
  });

  const groupedByDate = mealEntries.reduce<Record<string, MealEntry[]>>((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {});

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="fitness-card animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (Object.keys(groupedByDate).length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">No meals logged yet</p>
        <p className="text-sm text-gray-400 mt-1">Start tracking your nutrition!</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-220px)]">
      <div className="p-4 space-y-6">
        {Object.entries(groupedByDate)
          .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
          .map(([date, entries]) => (
            <div key={date} className="fitness-card">
              <h3 className="font-medium mb-3">{formatDate(date)}</h3>
              
              <div className="space-y-3">
                {entries.map(entry => {
                  const MealIcon = getMealTypeIcon(entry.mealType);
                  const totalCalories = entry.food.calories * entry.quantity;
                  
                  return (
                    <div 
                      key={entry.id} 
                      className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0"
                    >
                      <div className="flex items-center">
                        <div className="bg-fitness-primary/10 p-2 rounded-lg mr-3">
                          <MealIcon className="text-fitness-primary" size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{entry.food.name}</p>
                          <p className="text-xs text-gray-600 capitalize">
                            {entry.mealType} • {entry.quantity} {entry.quantity > 1 ? 'servings' : 'serving'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{Math.round(totalCalories)} cal</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-3 pt-3 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Calories</span>
                  <span className="font-bold">
                    {Math.round(entries.reduce((sum, entry) => sum + (entry.food.calories * entry.quantity), 0))} cal
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </ScrollArea>
  );
};

export default MealHistory;
