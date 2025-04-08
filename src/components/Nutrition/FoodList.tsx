
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchIcon } from 'lucide-react';
import { Food, getFoods, searchFoods } from '@/data/mockData';
import FoodCard from './FoodCard';

const FoodList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data: foods = [], isLoading } = useQuery({
    queryKey: ['foods', searchQuery],
    queryFn: () => searchQuery ? searchFoods(searchQuery) : getFoods(),
  });
  
  const categories = ['protein', 'grain', 'fruit', 'vegetable', 'dairy'];
  
  const filteredFoods = selectedCategory 
    ? foods.filter(food => food.category === selectedCategory)
    : foods;

  return (
    <div className="p-4">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search foods..."
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
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : filteredFoods.length > 0 ? (
        <div className="space-y-4">
          {filteredFoods.map(food => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No foods found</p>
          <p className="text-sm text-gray-400 mt-1">Try a different search term</p>
        </div>
      )}
    </div>
  );
};

export default FoodList;
