
import React from 'react';
import { StopCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkoutActionsProps {
  workoutActive: boolean;
  workoutCompleted: boolean;
  hasName: boolean;
  hasExercises: boolean;
  onStartWorkout: () => void;
  onStopWorkout: () => void;
  onSaveWorkout: () => void;
  onCancel: () => void;
}

const WorkoutActions: React.FC<WorkoutActionsProps> = ({
  workoutActive,
  workoutCompleted,
  hasName,
  hasExercises,
  onStartWorkout,
  onStopWorkout,
  onSaveWorkout,
  onCancel
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t max-w-md mx-auto">
      {!workoutActive && !workoutCompleted ? (
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onStartWorkout}
            disabled={!hasName || !hasExercises}
          >
            Start Workout
          </Button>
        </div>
      ) : workoutActive ? (
        <Button
          type="button"
          className="w-full bg-red-600 hover:bg-red-700"
          onClick={onStopWorkout}
        >
          <StopCircle className="mr-2" />
          Complete Workout
        </Button>
      ) : (
        <Button
          type="button"
          className="w-full"
          onClick={onSaveWorkout}
        >
          Save Workout
        </Button>
      )}
    </div>
  );
};

export default WorkoutActions;
