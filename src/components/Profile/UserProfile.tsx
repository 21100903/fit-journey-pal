
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, ChevronRight, User, Shield, Info, Bell, Moon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully');
  };
  
  return (
    <div className="p-4">
      <div className="fitness-card mb-6">
        <div className="flex items-center">
          <div className="bg-fitness-primary/10 w-16 h-16 rounded-full flex items-center justify-center mr-4">
            <User size={28} className="text-fitness-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.name || 'User'}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <button 
            onClick={handleLogout}
            className="fitness-btn-outline w-full flex items-center justify-center"
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </button>
        </div>
      </div>
      
      <h3 className="font-bold text-lg mb-3">Settings</h3>
      
      <div className="fitness-card space-y-1 divide-y">
        <div className="py-3 px-1 flex items-center justify-between cursor-pointer">
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-md mr-3">
              <User size={18} className="text-gray-600" />
            </div>
            <span>Account Settings</span>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </div>
        
        <div className="py-3 px-1 flex items-center justify-between cursor-pointer">
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-md mr-3">
              <Bell size={18} className="text-gray-600" />
            </div>
            <span>Notifications</span>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </div>
        
        <div className="py-3 px-1 flex items-center justify-between cursor-pointer">
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-md mr-3">
              <Moon size={18} className="text-gray-600" />
            </div>
            <span>Appearance</span>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </div>
        
        <div className="py-3 px-1 flex items-center justify-between cursor-pointer">
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-md mr-3">
              <Shield size={18} className="text-gray-600" />
            </div>
            <span>Privacy & Security</span>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </div>
        
        <div className="py-3 px-1 flex items-center justify-between cursor-pointer">
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-md mr-3">
              <Info size={18} className="text-gray-600" />
            </div>
            <span>About</span>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </div>
      </div>
      
      <p className="text-center text-xs text-gray-500 mt-6">
        Version 1.0.0 • FitJourneyPal
      </p>
    </div>
  );
};

export default UserProfile;
