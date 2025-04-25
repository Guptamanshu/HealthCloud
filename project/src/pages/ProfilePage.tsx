import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { getUserProfile, updateUserProfile } from '../lib/supabase';
import { dummyProfile } from '../data/dummyData';

interface UserProfile {
  id?: string;
  full_name?: string;
  age?: number;
  gender?: string;
  height?: number;
  medical_conditions?: string;
  emergency_contact?: string;
}

export const ProfilePage = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile>(dummyProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const formattedProfile = {
        ...profile,
        age: profile.age ? Number(profile.age) : undefined,
        height: profile.height ? Number(profile.height) : undefined,
      };
      
      const { error } = await updateUserProfile(user?.id || '', formattedProfile);
      if (error) throw error;
      setSuccessMessage('Profile updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-gray-500">Manage your personal information</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-20 w-20 rounded-full overflow-hidden">
              <img 
                src={dummyProfile.profile_image} 
                alt={dummyProfile.full_name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{dummyProfile.full_name}</h2>
              <p className="text-gray-500">{dummyProfile.lifestyle.occupation}</p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-600">{successMessage}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="full_name"
                value={profile.full_name || ''}
                onChange={handleChange}
                placeholder="Your full name"
              />
              
              <Input
                label="Email"
                type="email"
                value={user?.email || ''}
                disabled
                className="bg-gray-100"
              />
              
              <Input
                label="Age"
                name="age"
                type="number"
                value={profile.age?.toString() || ''}
                onChange={handleChange}
                placeholder="Your age"
              />
              
              <Input
                label="Gender"
                name="gender"
                value={profile.gender || ''}
                onChange={handleChange}
                placeholder="Your gender"
              />
              
              <Input
                label="Height (cm)"
                name="height"
                type="number"
                step="0.1"
                value={profile.height?.toString() || ''}
                onChange={handleChange}
                placeholder="Your height in cm"
              />
              
              <Input
                label="Medical Conditions"
                name="medical_conditions"
                value={profile.medical_conditions || ''}
                onChange={handleChange}
                placeholder="Any medical conditions"
              />
              
              <Input
                label="Emergency Contact"
                name="emergency_contact"
                value={profile.emergency_contact || ''}
                onChange={handleChange}
                placeholder="Emergency contact details"
              />
            </div>
            
            <div className="mt-6">
              <Button
                type="submit"
                isLoading={isLoading}
              >
                Save Profile
              </Button>
            </div>
          </form>
        </Card>

        <Card title="Health Goals">
          <div className="space-y-4">
            {dummyProfile.fitness_goals.map((goal, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <p className="text-gray-700">{goal}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      <Card title="Lifestyle Information">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(dummyProfile.lifestyle).map(([key, value]) => (
            <div key={key} className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 capitalize">{key.replace('_', ' ')}</p>
              <p className="text-gray-900 font-medium">{value}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};