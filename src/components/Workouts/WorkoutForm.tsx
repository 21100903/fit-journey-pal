
import React from 'react';
import { Clock } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';

interface CustomWorkoutForm {
  name: string;
  description: string;
  exercises: any[];
}

interface WorkoutFormProps {
  form: UseFormReturn<CustomWorkoutForm>;
  workoutActive: boolean;
  workoutCompleted: boolean;
  workoutTimeSpent: number | null;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ 
  form, 
  workoutActive, 
  workoutCompleted, 
  workoutTimeSpent 
}) => {
  return (
    <form>
      <div className="space-y-4">
        {!workoutActive && !workoutCompleted && (
          <>
            <div>
              <Label htmlFor="name">Workout Name</Label>
              <Input
                id="name"
                {...form.register('name')}
                placeholder="My Custom Workout"
                disabled={workoutActive}
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                {...form.register('description')}
                placeholder="Describe your workout"
                disabled={workoutActive}
              />
            </div>
          </>
        )}
        
        {workoutCompleted && (
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-green-800">
                Workout Complete!
              </h3>
              <div className="flex items-center text-green-800">
                <Clock size={16} className="mr-1" />
                <span>{workoutTimeSpent} minutes</span>
              </div>
            </div>
            <p className="text-green-600 text-sm mt-1">
              Great job completing your workout!
            </p>
          </div>
        )}
      </div>
    </form>
  );
};

export default WorkoutForm;
