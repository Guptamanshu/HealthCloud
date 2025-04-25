import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  HeartPulse, 
  BarChart2, 
  Settings, 
  User,
  Menu,
  X,
  ActivitySquare
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Health Metrics', path: '/health-metrics', icon: <HeartPulse size={20} /> },
    { name: 'Reports', path: '/reports', icon: <BarChart2 size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const NavItem = ({ name, path, icon }: { name: string; path: string; icon: React.ReactNode }) => (
    <NavLink
      to={path}
      className={({ isActive }) => `
        flex items-center gap-3 px-4 py-3 rounded-lg transition-all
        ${isActive 
          ? 'bg-blue-600 text-white font-medium'
          : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
        }
      `}
      onClick={() => setIsOpen(false)}
    >
      {icon}
      <span>{name}</span>
    </NavLink>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Mobile toggle */}
      <button
        className="fixed left-4 top-4 p-2 rounded-md bg-white shadow-md text-gray-700 z-30 lg:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-30 transition-transform duration-300
          transform lg:translate-x-0 lg:relative
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <ActivitySquare className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="font-bold text-xl text-gray-900">HealthMonitor</h1>
                <p className="text-xs text-gray-500">Cloud Health Tracking</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} HealthMonitor
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};