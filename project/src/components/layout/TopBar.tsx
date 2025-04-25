import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { Bell, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { dummyProfile } from '../../data/dummyData';

export const TopBar: React.FC = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="bg-white shadow-sm z-10 py-3 px-4 md:px-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">Health Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-700">
                {dummyProfile.full_name}
              </p>
              <p className="text-xs text-gray-500">{dummyProfile.lifestyle.occupation}</p>
            </div>
            
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img 
                src={dummyProfile.profile_image} 
                alt={dummyProfile.full_name}
                className="h-full w-full object-cover"
              />
            </div>

            <Button 
              variant="ghost"
              className="text-gray-500"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <span className="sr-only md:not-sr-only md:ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};