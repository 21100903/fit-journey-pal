
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchIcon, Filter } from 'lucide-react';
import { Workout, getWorkouts, searchWorkouts } from '@/data/mockData';
import WorkoutCard from './WorkoutCard';

const WorkoutList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data: workouts = [], isLoading } = useQuery({
    queryKey: ['workouts', searchQuery],
    queryFn: () => searchQuery ? searchWorkouts(searchQuery) : getWorkouts(),
  });
  
  const categories = ['strength', 'cardio', 'yoga', 'core'];
  
  const filteredWorkouts = selectedCategory 
    ? workouts.filter(workout => workout.category === selectedCategory)
    : workouts;

  return (
    <div className="p-4">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search workouts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="fitness-input pl-10"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      
      <div className="mb-4 flex overflow-x-auto pb-2 -mx-1 hide-scrollbar">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm mr-2 whitespace-nowrap ${
            selectedCategory === null
              ? 'bg-fitness-primary text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm mr-2 capitalize whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-fitness-primary text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="fitness-card animate-pulse">
              <div className="h-20 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : filteredWorkouts.length > 0 ? (
        <div className="space-y-4">
          {filteredWorkouts.map(workout => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No workouts found</p>
          <p className="text-sm text-gray-400 mt-1">Try a different search term</p>
        </div>
      )}
    </div>
  );
};

export default WorkoutList;
