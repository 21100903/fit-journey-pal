
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserMealEntries, MealEntry, deleteMealEntry } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Apple, Coffee, Pizza, Salad, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

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
  const queryClient = useQueryClient();
  const [mealToDelete, setMealToDelete] = React.useState<MealEntry | null>(null);
  
  const { data: mealEntries = [], isLoading } = useQuery({
    queryKey: ['mealEntries', user?.id],
    queryFn: () => getUserMealEntries(user?.id || ''),
    enabled: !!user?.id,
  });

  const deleteMutation = useMutation({
    mutationFn: (mealId: string) => deleteMealEntry(mealId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mealEntries', user?.id] });
      toast({
        title: "Meal deleted",
        description: "The meal entry has been removed from your history.",
      });
      setMealToDelete(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete the meal entry. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleDeleteClick = (meal: MealEntry) => {
    setMealToDelete(meal);
  };

  const confirmDelete = () => {
    if (mealToDelete) {
      deleteMutation.mutate(mealToDelete.id);
    }
  };

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
    <>
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
                        <div className="flex items-center">
                          <p className="font-medium text-sm mr-4">{Math.round(totalCalories)} cal</p>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteClick(entry)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                          </Button>
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

      <Dialog open={!!mealToDelete} onOpenChange={(open) => !open && setMealToDelete(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Meal Entry</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this meal? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setMealToDelete(null)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MealHistory;
