
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from "react-hook-form";
import { addCustomFood } from '@/data/mockData';
import { useQueryClient } from '@tanstack/react-query';

interface CustomFoodForm {
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
}

const CustomFood: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<CustomFoodForm>({
    defaultValues: {
      name: '',
      category: 'protein',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      servingSize: '100g'
    }
  });

  const onSubmit = async (data: CustomFoodForm) => {
    if (!user) {
      toast.error("Please log in to add custom foods");
      navigate('/login');
      return;
    }

    try {
      // Add the custom food
      await addCustomFood({
        ...data,
        id: 'custom-' + Date.now(),
      });
      
      // Invalidate queries to refresh food list
      queryClient.invalidateQueries({ queryKey: ['foods'] });
      
      toast.success("Custom food added successfully!");
      navigate('/nutrition');
    } catch (error) {
      console.error('Error adding custom food:', error);
      toast.error("Failed to add custom food. Please try again.");
    }
  };

  const handleCategoryChange = (value: string) => {
    setValue('category', value);
  };

  return (
    <div className="pb-24">
      <div className="relative">
        <div className="h-40 bg-gradient-to-r from-fitness-primary to-fitness-accent"></div>
        <button 
          onClick={() => navigate('/nutrition')}
          className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md"
        >
          <ArrowLeft size={20} />
        </button>
      </div>
      
      <div className="-mt-10 bg-white rounded-t-3xl p-4 relative z-10">
        <h1 className="text-2xl font-bold mb-4">Add Custom Food</h1>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Food Name</Label>
              <Input
                id="name"
                {...register('name', { required: "Food name is required" })}
                placeholder="e.g., Homemade Granola"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <Select 
                onValueChange={handleCategoryChange} 
                defaultValue="protein"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="protein">Protein</SelectItem>
                  <SelectItem value="grain">Grain</SelectItem>
                  <SelectItem value="fruit">Fruit</SelectItem>
                  <SelectItem value="vegetable">Vegetable</SelectItem>
                  <SelectItem value="dairy">Dairy</SelectItem>
                  <SelectItem value="fat">Fat</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="servingSize">Serving Size</Label>
              <Input
                id="servingSize"
                {...register('servingSize', { required: "Serving size is required" })}
                placeholder="e.g., 100g, 1 cup"
              />
              {errors.servingSize && <p className="text-red-500 text-sm mt-1">{errors.servingSize.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                type="number"
                {...register('calories', { 
                  required: "Calories are required",
                  min: { value: 0, message: "Calories cannot be negative" }
                })}
              />
              {errors.calories && <p className="text-red-500 text-sm mt-1">{errors.calories.message}</p>}
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="protein">Protein (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  step="0.1"
                  {...register('protein', { 
                    required: "Protein is required",
                    min: { value: 0, message: "Protein cannot be negative" }
                  })}
                />
                {errors.protein && <p className="text-red-500 text-sm mt-1">{errors.protein.message}</p>}
              </div>
              
              <div>
                <Label htmlFor="carbs">Carbs (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  step="0.1"
                  {...register('carbs', { 
                    required: "Carbs are required",
                    min: { value: 0, message: "Carbs cannot be negative" }
                  })}
                />
                {errors.carbs && <p className="text-red-500 text-sm mt-1">{errors.carbs.message}</p>}
              </div>
              
              <div>
                <Label htmlFor="fat">Fat (g)</Label>
                <Input
                  id="fat"
                  type="number"
                  step="0.1"
                  {...register('fat', { 
                    required: "Fat is required",
                    min: { value: 0, message: "Fat cannot be negative" }
                  })}
                />
                {errors.fat && <p className="text-red-500 text-sm mt-1">{errors.fat.message}</p>}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button type="submit" className="w-full">
              <Plus className="mr-2" size={16} />
              Add Custom Food
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomFood;
