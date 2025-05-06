export interface Workout {
  id: string;
  name: string;
  category: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  caloriesBurn: number; // estimated calories
  instructions: string[];
  exercises: Exercise[]; // Added exercises array
  imageUrl?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  duration?: number; // in seconds
  description: string;
}

export interface Food {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
  imageUrl?: string;
}

export interface MealEntry {
  id: string;
  userId: string;
  foodId: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  quantity: number;
  food: Food;
}

export interface WorkoutEntry {
  id: string;
  userId: string;
  workoutId: string;
  date: string;
  duration: number;
  intensity: 'low' | 'medium' | 'high';
  notes?: string;
  workout: Workout;
}

// Mock workout data
export const workouts: Workout[] = [
  {
    id: '1',
    name: 'Full Body Circuit',
    category: 'strength',
    description: 'A complete body workout targeting all major muscle groups',
    difficulty: 'intermediate',
    duration: 45,
    caloriesBurn: 350,
    instructions: [
      'Perform each exercise for 45 seconds with 15 seconds rest',
      'Complete 3 rounds of the circuit',
      'Rest 1 minute between rounds'
    ],
    exercises: [
      {
        id: '1-1',
        name: 'Push-ups',
        sets: 3,
        reps: 15,
        description: 'Keep your body straight and lower yourself until your chest nearly touches the ground'
      },
      {
        id: '1-2',
        name: 'Squats',
        sets: 3,
        reps: 20,
        description: 'Stand with feet shoulder-width apart and lower your hips until your thighs are parallel to the floor'
      },
      {
        id: '1-3',
        name: 'Plank',
        duration: 60,
        description: 'Hold a push-up position with your weight on your forearms for the specified time'
      },
      {
        id: '1-4',
        name: 'Lunges',
        sets: 3,
        reps: 12,
        description: 'Step forward with one leg and lower your hips until both knees are bent at 90 degrees'
      },
      {
        id: '1-5',
        name: 'Mountain Climbers',
        duration: 45,
        description: 'Alternate bringing your knees toward your chest in a push-up position'
      }
    ]
  },
  {
    id: '2',
    name: 'Morning Yoga Flow',
    category: 'yoga',
    description: 'Energizing yoga sequence to start your day right',
    difficulty: 'beginner',
    duration: 30,
    caloriesBurn: 150,
    instructions: [
      'Begin with 5 minutes of deep breathing',
      'Move through sun salutations',
      'Hold each pose for 5 breaths',
      'End with 5 minutes of meditation'
    ],
    exercises: [
      {
        id: '2-1',
        name: 'Deep Breathing',
        duration: 300,
        description: 'Sit comfortably and focus on deep, slow breaths'
      },
      {
        id: '2-2',
        name: 'Sun Salutation A',
        sets: 5,
        description: 'Flow through the sequence of poses, synchronizing movement with breath'
      },
      {
        id: '2-3',
        name: 'Warrior Poses',
        sets: 3,
        description: 'Hold each warrior pose (I, II, and III) for 30 seconds on each side'
      },
      {
        id: '2-4',
        name: 'Seated Forward Fold',
        duration: 120,
        description: 'Sit with legs extended and fold forward from the hips'
      },
      {
        id: '2-5',
        name: 'Savasana',
        duration: 300,
        description: 'Lie flat on your back in corpse pose for final relaxation'
      }
    ]
  },
  {
    id: '3',
    name: 'HIIT Cardio Blast',
    category: 'cardio',
    description: 'High intensity interval training to maximize calorie burn',
    difficulty: 'advanced',
    duration: 25,
    caloriesBurn: 400,
    instructions: [
      '30 seconds maximum effort, 30 seconds rest',
      'Complete 10 rounds',
      'Focus on proper form over speed'
    ],
    exercises: [
      {
        id: '3-1',
        name: 'Burpees',
        sets: 5,
        reps: 10,
        description: 'From standing, drop to a squat position, kick feet back, do a push-up, return to squat, and jump up'
      },
      {
        id: '3-2',
        name: 'Jumping Jacks',
        duration: 60,
        description: 'Jump with legs spread wide and arms overhead, then return to standing with arms at sides'
      },
      {
        id: '3-3',
        name: 'High Knees',
        duration: 45,
        description: 'Run in place, lifting knees as high as possible'
      },
      {
        id: '3-4',
        name: 'Squat Jumps',
        sets: 4,
        reps: 15,
        description: 'Drop into a squat, then explode upward into a jump, landing softly back in squat position'
      },
      {
        id: '3-5',
        name: 'Sprint in Place',
        duration: 30,
        description: 'Run in place as fast as possible, focusing on speed and intensity'
      }
    ]
  },
  {
    id: '4',
    name: 'Core Crusher',
    category: 'core',
    description: 'Focused abdominal workout to strengthen your core',
    difficulty: 'intermediate',
    duration: 20,
    caloriesBurn: 200,
    instructions: [
      'Perform each exercise for 45 seconds',
      'Rest 15 seconds between exercises',
      'Complete 3 rounds'
    ],
    exercises: [
      {
        id: '4-1',
        name: 'Crunches',
        sets: 3,
        reps: 20,
        description: 'Lie on your back with knees bent, place hands behind head, and lift shoulders toward knees'
      },
      {
        id: '4-2',
        name: 'Plank',
        duration: 60,
        description: 'Hold a push-up position with weight on forearms, keeping body in a straight line'
      },
      {
        id: '4-3',
        name: 'Russian Twists',
        sets: 3,
        reps: 30,
        description: 'Sit with knees bent, lean back slightly, rotate torso from side to side'
      },
      {
        id: '4-4',
        name: 'Leg Raises',
        sets: 3,
        reps: 15,
        description: 'Lie on back, hands at sides, lift legs straight up and slowly lower them without touching the floor'
      },
      {
        id: '4-5',
        name: 'Bicycle Crunches',
        sets: 3,
        reps: 30,
        description: 'Lie on back, alternate bringing elbow to opposite knee in a pedaling motion'
      }
    ]
  },
  {
    id: '5',
    name: 'Lower Body Strength',
    category: 'strength',
    description: 'Build stronger legs and glutes with this focused workout',
    difficulty: 'intermediate',
    duration: 40,
    caloriesBurn: 300,
    instructions: [
      'Warm up with 5 minutes of light cardio',
      'Perform 3-4 sets of each exercise',
      'Rest 60-90 seconds between sets',
      'Stretch thoroughly after workout'
    ],
    exercises: [
      {
        id: '5-1',
        name: 'Squats',
        sets: 4,
        reps: 15,
        description: 'Stand with feet shoulder-width apart and lower your hips until thighs are parallel to the floor'
      },
      {
        id: '5-2',
        name: 'Lunges',
        sets: 3,
        reps: 12,
        description: 'Step forward with one leg and lower hips until both knees are bent at 90 degrees, alternate legs'
      },
      {
        id: '5-3',
        name: 'Glute Bridges',
        sets: 3,
        reps: 20,
        description: 'Lie on back, feet flat on floor, lift hips toward ceiling, squeezing glutes at the top'
      },
      {
        id: '5-4',
        name: 'Calf Raises',
        sets: 3,
        reps: 30,
        description: 'Stand with feet hip-width apart, raise heels off the ground, then lower back down'
      },
      {
        id: '5-5',
        name: 'Wall Sit',
        duration: 60,
        description: 'Lean against wall with knees bent at 90 degrees, hold position for the specified time'
      }
    ]
  }
];

// Mock food data
export const foods: Food[] = [
  {
    id: '1',
    name: 'Grilled Chicken Breast',
    category: 'protein',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    servingSize: '100g'
  },
  {
    id: '2',
    name: 'Brown Rice',
    category: 'grain',
    calories: 216,
    protein: 5,
    carbs: 45,
    fat: 1.8,
    servingSize: '1 cup cooked'
  },
  {
    id: '3',
    name: 'Avocado',
    category: 'fruit',
    calories: 240,
    protein: 3,
    carbs: 12,
    fat: 22,
    servingSize: '1 medium'
  },
  {
    id: '4',
    name: 'Greek Yogurt',
    category: 'dairy',
    calories: 130,
    protein: 17,
    carbs: 6,
    fat: 4,
    servingSize: '170g container'
  },
  {
    id: '5',
    name: 'Banana',
    category: 'fruit',
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fat: 0.4,
    servingSize: '1 medium'
  },
  {
    id: '6',
    name: 'Oatmeal',
    category: 'grain',
    calories: 158,
    protein: 6,
    carbs: 27,
    fat: 3.2,
    servingSize: '1 cup cooked'
  },
  {
    id: '7',
    name: 'Salmon Fillet',
    category: 'protein',
    calories: 206,
    protein: 22,
    carbs: 0,
    fat: 13,
    servingSize: '100g'
  },
  {
    id: '8',
    name: 'Broccoli',
    category: 'vegetable',
    calories: 55,
    protein: 3.7,
    carbs: 11,
    fat: 0.6,
    servingSize: '1 cup'
  }
];

// Mock meal entries (will be used as sample data for logged-in user)
export const mealEntries: MealEntry[] = [
  {
    id: '1',
    userId: '1',
    foodId: '1',
    date: new Date().toISOString().split('T')[0], // today
    mealType: 'lunch',
    quantity: 1,
    food: foods.find(f => f.id === '1')!
  },
  {
    id: '2',
    userId: '1',
    foodId: '2',
    date: new Date().toISOString().split('T')[0], // today
    mealType: 'lunch',
    quantity: 1,
    food: foods.find(f => f.id === '2')!
  },
  {
    id: '3',
    userId: '1',
    foodId: '4',
    date: new Date().toISOString().split('T')[0], // today
    mealType: 'breakfast',
    quantity: 1,
    food: foods.find(f => f.id === '4')!
  }
];

// Mock workout entries
export const workoutEntries: WorkoutEntry[] = [
  {
    id: '1',
    userId: '1',
    workoutId: '1',
    date: new Date().toISOString().split('T')[0], // today
    duration: 45,
    intensity: 'medium',
    notes: 'Felt strong today!',
    workout: workouts.find(w => w.id === '1')!
  },
  {
    id: '2',
    userId: '1',
    workoutId: '3',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // yesterday
    duration: 25,
    intensity: 'high',
    notes: 'Pushed really hard, great session',
    workout: workouts.find(w => w.id === '3')!
  }
];

// Helper functions to simulate API calls
export const getWorkouts = () => {
  return new Promise<Workout[]>((resolve) => {
    setTimeout(() => resolve(workouts), 500);
  });
};

export const searchWorkouts = (query: string) => {
  const filteredWorkouts = workouts.filter(
    workout => workout.name.toLowerCase().includes(query.toLowerCase()) || 
               workout.category.toLowerCase().includes(query.toLowerCase())
  );
  
  return new Promise<Workout[]>((resolve) => {
    setTimeout(() => resolve(filteredWorkouts), 500);
  });
};

export const getFoods = () => {
  return new Promise<Food[]>((resolve) => {
    setTimeout(() => resolve(foods), 500);
  });
};

export const searchFoods = (query: string) => {
  const filteredFoods = foods.filter(
    food => food.name.toLowerCase().includes(query.toLowerCase()) || 
            food.category.toLowerCase().includes(query.toLowerCase())
  );
  
  return new Promise<Food[]>((resolve) => {
    setTimeout(() => resolve(filteredFoods), 500);
  });
};

export const getUserMealEntries = (userId: string, date?: string) => {
  const dateToFilter = date || new Date().toISOString().split('T')[0];
  
  const filteredEntries = mealEntries.filter(
    entry => entry.userId === userId && entry.date === dateToFilter
  );
  
  return new Promise<MealEntry[]>((resolve) => {
    setTimeout(() => resolve(filteredEntries), 500);
  });
};

export const deleteMealEntry = (mealId: string) => {
  const index = mealEntries.findIndex(entry => entry.id === mealId);
  
  if (index !== -1) {
    mealEntries.splice(index, 1);
  }
  
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 500);
  });
};

export const getUserWorkoutEntries = (userId: string, date?: string) => {
  const dateToFilter = date || new Date().toISOString().split('T')[0];
  
  const filteredEntries = workoutEntries.filter(
    entry => entry.userId === userId && entry.date === dateToFilter
  );
  
  return new Promise<WorkoutEntry[]>((resolve) => {
    setTimeout(() => resolve(filteredEntries), 500);
  });
};

export const addMealEntry = (entry: Omit<MealEntry, 'id' | 'food'>) => {
  const newEntry: MealEntry = {
    ...entry,
    id: (mealEntries.length + 1).toString(),
    food: foods.find(f => f.id === entry.foodId)!
  };
  
  mealEntries.push(newEntry);
  
  return new Promise<MealEntry>((resolve) => {
    setTimeout(() => resolve(newEntry), 500);
  });
};

export const addWorkoutEntry = (entry: Omit<WorkoutEntry, 'id' | 'workout'>) => {
  const newEntry: WorkoutEntry = {
    ...entry,
    id: (workoutEntries.length + 1).toString(),
    workout: workouts.find(w => w.id === entry.workoutId)!
  };
  
  workoutEntries.push(newEntry);
  
  return new Promise<WorkoutEntry>((resolve) => {
    setTimeout(() => resolve(newEntry), 500);
  });
};
