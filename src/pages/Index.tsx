
import React from 'react';
import MobileLayout from '@/components/Layout/MobileLayout';
import DashboardSummary from '@/components/Dashboard/DashboardSummary';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-fitness-light to-white p-6">
        <h1 className="text-3xl font-bold text-fitness-dark mb-2 text-center">FitJourneyPal</h1>
        <p className="text-gray-600 mb-8 text-center">Track your fitness and nutrition journey</p>
        
        <div className="space-y-4 w-full max-w-sm">
          <Button
            onClick={() => navigate('/login')}
            className="w-full bg-fitness-primary hover:bg-fitness-primary/90"
          >
            Login
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/register')}
            className="w-full"
          >
            Create Account
          </Button>
        </div>
        
        <div className="mt-12 space-y-6 w-full max-w-sm">
          <div className="fitness-card text-left">
            <h3 className="font-bold flex items-center">
              <svg className="w-5 h-5 mr-2 text-fitness-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Track Your Progress
            </h3>
            <p className="text-sm text-gray-600 mt-1">Log workouts and meals to see your health journey</p>
          </div>
          
          <div className="fitness-card text-left">
            <h3 className="font-bold flex items-center">
              <svg className="w-5 h-5 mr-2 text-fitness-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Foods & Workouts
            </h3>
            <p className="text-sm text-gray-600 mt-1">Find nutritional data and workout routines with ease</p>
          </div>
          
          <div className="fitness-card text-left">
            <h3 className="font-bold flex items-center">
              <svg className="w-5 h-5 mr-2 text-fitness-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personalized Experience
            </h3>
            <p className="text-sm text-gray-600 mt-1">Get insights tailored to your fitness goals</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <MobileLayout>
      <div className="bg-fitness-primary text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Hi, {user?.name?.split(' ')[0]}</h1>
            <p className="text-sm text-white/80">Let's track your progress today</p>
          </div>
          <div className="bg-white/20 p-2 rounded-full" onClick={() => navigate('/profile')}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>
      <DashboardSummary />
    </MobileLayout>
  );
};

export default Index;
