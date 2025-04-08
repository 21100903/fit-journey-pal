
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Dumbbell, 
  Apple, 
  User, 
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Dumbbell, label: 'Workouts', path: '/workouts' },
    { icon: Plus, label: 'Add', path: '/add', isAction: true },
    { icon: Apple, label: 'Nutrition', path: '/nutrition' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-gray-50">
      <main className="flex-1 pb-16">
        {children}
      </main>
      
      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 max-w-md mx-auto">
        <ul className="flex justify-around items-center">
          {navItems.map((item) => (
            <li key={item.label} className="flex-1">
              <button 
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full flex flex-col items-center justify-center pt-1 pb-1",
                  item.isAction ? "text-white" : isActive(item.path) ? "text-fitness-primary" : "text-gray-500"
                )}
              >
                {item.isAction ? (
                  <div className="bg-fitness-primary p-3 rounded-full -mt-6 shadow-lg hover:bg-fitness-primary/90 transition-colors">
                    <item.icon size={20} />
                  </div>
                ) : (
                  <>
                    <item.icon size={20} />
                    <span className="text-xs mt-1">{item.label}</span>
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileLayout;
