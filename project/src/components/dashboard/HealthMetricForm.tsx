import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useHealthStore } from '../../store/healthStore';
import { useAuthStore } from '../../store/authStore';

export const HealthMetricForm: React.FC = () => {
  const { user } = useAuthStore();
  const { addHealthData, isLoading, error } = useHealthStore();
  
  const [formData, setFormData] = useState({
    heart_rate: '',
    blood_pressure_systolic: '',
    blood_pressure_diastolic: '',
    blood_glucose: '',
    weight: '',
    steps: '',
    sleep_hours: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    // Convert string values to numbers
    const numericData = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value === '' ? undefined : Number(value);
      return acc;
    }, {} as Record<string, number | undefined>);
    
    await addHealthData(user.id, numericData);
    
    // Reset form
    setFormData({
      heart_rate: '',
      blood_pressure_systolic: '',
      blood_pressure_diastolic: '',
      blood_glucose: '',
      weight: '',
      steps: '',
      sleep_hours: '',
    });
  };

  return (
    <Card title="Add Health Metrics">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Heart Rate (bpm)"
            name="heart_rate"
            type="number"
            value={formData.heart_rate}
            onChange={handleChange}
            placeholder="e.g., 75"
          />
          
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Blood Pressure (Systolic)"
              name="blood_pressure_systolic"
              type="number"
              value={formData.blood_pressure_systolic}
              onChange={handleChange}
              placeholder="e.g., 120"
            />
            
            <Input
              label="Blood Pressure (Diastolic)"
              name="blood_pressure_diastolic"
              type="number"
              value={formData.blood_pressure_diastolic}
              onChange={handleChange}
              placeholder="e.g., 80"
            />
          </div>
          
          <Input
            label="Blood Glucose (mg/dL)"
            name="blood_glucose"
            type="number"
            value={formData.blood_glucose}
            onChange={handleChange}
            placeholder="e.g., 100"
          />
          
          <Input
            label="Weight (kg)"
            name="weight"
            type="number"
            step="0.1"
            value={formData.weight}
            onChange={handleChange}
            placeholder="e.g., 70.5"
          />
          
          <Input
            label="Steps"
            name="steps"
            type="number"
            value={formData.steps}
            onChange={handleChange}
            placeholder="e.g., 8000"
          />
          
          <Input
            label="Sleep (hours)"
            name="sleep_hours"
            type="number"
            step="0.1"
            value={formData.sleep_hours}
            onChange={handleChange}
            placeholder="e.g., 7.5"
          />
        </div>
        
        <div className="mt-6">
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
          >
            Save Health Data
          </Button>
        </div>
      </form>
    </Card>
  );
};