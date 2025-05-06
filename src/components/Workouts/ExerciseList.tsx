import React from 'react';
import { Plus, Check, Trash2, PlayCircle, StopCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  completed: boolean;
  timeSpent?: number;
  notes?: string;
  description: string;
}

interface ExerciseListProps {
  exercises: Exercise[];
  workoutActive: boolean;
  workoutCompleted: boolean;
  currentExerciseIndex: number;
  activeExerciseId: string | null;
  onAddExercise: () => void;
  onRemoveExercise: (id: string) => void;
  onUpdateExercise: (id: string, field: keyof Exercise, value: any) => void;
  onStartExercise: (id: string) => void;
  onStopExercise: (id: string) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  workoutActive,
  workoutCompleted,
  currentExerciseIndex,
  activeExerciseId,
  onAddExercise,
  onRemoveExercise,
  onUpdateExercise,
  onStartExercise,
  onStopExercise
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Exercises</h3>
        {!workoutActive && !workoutCompleted && (
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={onAddExercise}
            className="flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Add Exercise
          </Button>
        )}
      </div>
      
      {exercises.length === 0 ? (
        <p className="text-gray-500 text-sm italic">
          No exercises added yet. Click "Add Exercise" to begin.
        </p>
      ) : (
        <div className="space-y-4">
          {exercises.map((exercise, index) => (
            <ExerciseItem 
              key={exercise.id}
              exercise={exercise}
              index={index}
              workoutActive={workoutActive}
              workoutCompleted={workoutCompleted}
              isCurrentExercise={currentExerciseIndex === index}
              isActive={activeExerciseId === exercise.id}
              onRemove={onRemoveExercise}
              onUpdate={onUpdateExercise}
              onStart={onStartExercise}
              onStop={onStopExercise}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface ExerciseItemProps {
  exercise: Exercise;
  index: number;
  workoutActive: boolean;
  workoutCompleted: boolean;
  isCurrentExercise: boolean;
  isActive: boolean;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof Exercise, value: any) => void;
  onStart: (id: string) => void;
  onStop: (id: string) => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({
  exercise,
  index,
  workoutActive,
  workoutCompleted,
  isCurrentExercise,
  isActive,
  onRemove,
  onUpdate,
  onStart,
  onStop
}) => {
  return (
    <div
      className={`border rounded-lg p-3 ${
        exercise.completed ? "bg-gray-50" : ""
      } ${isActive ? "border-green-500" : ""} ${
        workoutActive && isCurrentExercise && !exercise.completed ? "border-blue-500 border-2" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 ${
            exercise.completed ? "bg-green-500 text-white" : "bg-fitness-primary text-white"
          }`}>
            {exercise.completed ? <Check size={12} /> : index + 1}
          </span>
          {!workoutActive && !workoutCompleted ? (
            <Input
              value={exercise.name}
              onChange={(e) => onUpdate(exercise.id, 'name', e.target.value)}
              placeholder="Exercise name"
              className="border-0 p-0 h-auto text-base font-medium"
            />
          ) : (
            <span className="font-medium">{exercise.name}</span>
          )}
        </div>
        
        {!workoutActive && !workoutCompleted ? (
          <Button 
            type="button" 
            variant="ghost" 
            size="sm"
            onClick={() => onRemove(exercise.id)}
          >
            <Trash2 size={16} />
          </Button>
        ) : workoutActive && !exercise.completed ? (
          isCurrentExercise ? (
            isActive ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onStop(exercise.id)}
                className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
              >
                <StopCircle size={16} className="mr-1" />
                Complete
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onStart(exercise.id)}
                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
              >
                <PlayCircle size={16} className="mr-1" />
                Start
              </Button>
            )
          ) : null
        ) : null}
      </div>
      
      {!workoutActive && !workoutCompleted ? (
        <div className="grid grid-cols-3 gap-2 mt-2">
          <div>
            <Label className="text-xs text-gray-500">Sets</Label>
            <Input
              type="number"
              min="1"
              value={exercise.sets}
              onChange={(e) => onUpdate(exercise.id, 'sets', parseInt(e.target.value) || 0)}
              className="h-8"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Reps</Label>
            <Input
              type="number"
              min="1"
              value={exercise.reps}
              onChange={(e) => onUpdate(exercise.id, 'reps', parseInt(e.target.value) || 0)}
              className="h-8"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Weight (opt)</Label>
            <Input
              type="number"
              min="0"
              value={exercise.weight || ''}
              onChange={(e) => onUpdate(exercise.id, 'weight', parseInt(e.target.value) || 0)}
              className="h-8"
              placeholder="0"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex space-x-4 text-sm text-gray-600">
            <span>{exercise.sets} sets</span>
            <span>{exercise.reps} reps</span>
            {exercise.weight ? <span>{exercise.weight} lbs</span> : null}
          </div>
          
          {exercise.completed && (
            <div className="mt-2 text-sm flex justify-between">
              <span className="text-green-600 font-medium flex items-center">
                Completed
              </span>
              {exercise.timeSpent && (
                <span className="text-gray-600 flex items-center">
                  <Clock size={14} className="mr-1" />
                  {exercise.timeSpent} seconds
                </span>
              )}
            </div>
          )}
          
          {workoutCompleted && (
            <div className="mt-2">
              <Label className="text-xs text-gray-500">Notes</Label>
              <Textarea
                placeholder="How did this exercise feel?"
                value={exercise.notes || ''}
                onChange={(e) => onUpdate(exercise.id, 'notes', e.target.value)}
                className="text-sm"
                rows={2}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExerciseList;
