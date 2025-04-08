
export interface Workout {
  id: string;
  name: string;
  category: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  caloriesBurn: number; // estimated calories
  instructions: string[];
  imageUrl?: string;
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
