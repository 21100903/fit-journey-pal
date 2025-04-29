
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Apple, Dumbbell, Plus } from 'lucide-react';

const AddEntry: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'workout' | 'food'>('workout');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Log Activity</h1>
      
      <div className="bg-gray-100 p-1 rounded-xl flex mb-6">
        <button
          onClick={() => setSelectedTab('workout')}
          className={`flex-1 py-3 rounded-lg flex items-center justify-center space-x-2 text-sm font-medium ${
            selectedTab === 'workout' 
              ? 'bg-white text-fitness-primary shadow-sm' 
              : 'text-gray-500'
          }`}
        >
          <Dumbbell size={16} />
          <span>Workout</span>
        </button>
        <button
          onClick={() => setSelectedTab('food')}
          className={`flex-1 py-3 rounded-lg flex items-center justify-center space-x-2 text-sm font-medium ${
            selectedTab === 'food' 
              ? 'bg-white text-fitness-primary shadow-sm' 
              : 'text-gray-500'
          }`}
        >
          <Apple size={16} />
          <span>Food</span>
        </button>
      </div>
      
      {selectedTab === 'workout' ? (
        <div className="space-y-4">
          <div className="fitness-card bg-fitness-primary/5 cursor-pointer" onClick={() => navigate('/workouts')}>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-fitness-primary/10 rounded-lg">
                <Dumbbell className="text-fitness-primary" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">Browse Workouts</h3>
                <p className="text-sm text-gray-600">Choose from our workout library</p>
              </div>
            </div>
          </div>
          
          <div className="fitness-card bg-fitness-accent/5 cursor-pointer" onClick={() => navigate('/custom-workout')}>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-fitness-accent/10 rounded-lg">
                <Plus className="text-fitness-accent" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">Create Custom Workout</h3>
                <p className="text-sm text-gray-600">Design your own workout routine</p>
              </div>
            </div>
          </div>
          
          <div className="bg-fitness-light rounded-lg p-4 mt-6">
            <h3 className="font-bold mb-2">Recent Workouts</h3>
            <p className="text-sm text-gray-600">Quickly add workouts you've done before</p>
            
            <div className="mt-3 space-y-2">
              <div 
                className="p-3 bg-white rounded-lg flex justify-between items-center cursor-pointer"
                onClick={() => navigate('/workouts/1')}
              >
                <div>
                  <p className="font-medium">Full Body Circuit</p>
                  <p className="text-xs text-gray-500">45 min • 350 cal</p>
                </div>
                <button className="text-fitness-primary text-sm font-medium">Add</button>
              </div>
              
              <div 
                className="p-3 bg-white rounded-lg flex justify-between items-center cursor-pointer"
                onClick={() => navigate('/workouts/3')}
              >
                <div>
                  <p className="font-medium">HIIT Cardio Blast</p>
                  <p className="text-xs text-gray-500">25 min • 400 cal</p>
                </div>
                <button className="text-fitness-primary text-sm font-medium">Add</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="fitness-card bg-fitness-primary/5 cursor-pointer" onClick={() => navigate('/nutrition')}>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-fitness-primary/10 rounded-lg">
                <Apple className="text-fitness-primary" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">Search Food Database</h3>
                <p className="text-sm text-gray-600">Find and log your meals from our database</p>
              </div>
            </div>
          </div>
          
          <div className="fitness-card bg-fitness-accent/5">
            <div className="text-center p-3">
              <p className="text-gray-600 text-sm">
                Want to track a food not in our database?
              </p>
              <p className="font-medium text-fitness-primary text-sm mt-1">
                Custom food tracking coming soon
              </p>
            </div>
          </div>
          
          <div className="bg-fitness-light rounded-lg p-4 mt-6">
            <h3 className="font-bold mb-2">Recent Foods</h3>
            <p className="text-sm text-gray-600">Quickly add foods you've logged before</p>
            
            <div className="mt-3 space-y-2">
              <div 
                className="p-3 bg-white rounded-lg flex justify-between items-center cursor-pointer"
                onClick={() => navigate('/nutrition/1')}
              >
                <div>
                  <p className="font-medium">Grilled Chicken Breast</p>
                  <p className="text-xs text-gray-500">165 cal • 31g protein</p>
                </div>
                <button className="text-fitness-primary text-sm font-medium">Add</button>
              </div>
              
              <div 
                className="p-3 bg-white rounded-lg flex justify-between items-center cursor-pointer"
                onClick={() => navigate('/nutrition/4')}
              >
                <div>
                  <p className="font-medium">Greek Yogurt</p>
                  <p className="text-xs text-gray-500">130 cal • 17g protein</p>
                </div>
                <button className="text-fitness-primary text-sm font-medium">Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEntry;
