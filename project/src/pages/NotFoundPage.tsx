import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { AlertTriangle } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-8">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-amber-100 rounded-full">
            <AlertTriangle size={48} className="text-amber-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">The page you are looking for does not exist.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard">
            <Button size="large">
              Go to Dashboard
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="large">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};