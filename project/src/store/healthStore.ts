import { create } from 'zustand';
import { getHealthData, saveHealthData } from '../lib/supabase';

export interface HealthMetric {
  id?: string;
  user_id: string;
  heart_rate?: number;
  blood_pressure_systolic?: number;
  blood_pressure_diastolic?: number;
  blood_glucose?: number;
  weight?: number;
  steps?: number;
  sleep_hours?: number;
  created_at: string;
}

interface HealthState {
  metrics: HealthMetric[];
  isLoading: boolean;
  error: string | null;
  fetchHealthData: (userId: string) => Promise<void>;
  addHealthData: (userId: string, data: Partial<HealthMetric>) => Promise<void>;
}

export const useHealthStore = create<HealthState>((set) => ({
  metrics: [],
  isLoading: false,
  error: null,

  fetchHealthData: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await getHealthData(userId);
      
      if (error) throw error;
      
      set({ 
        metrics: data || [],
        isLoading: false,
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error fetching health data',
        isLoading: false,
      });
    }
  },

  addHealthData: async (userId: string, healthData: Partial<HealthMetric>) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await saveHealthData(userId, healthData);
      
      if (error) throw error;
      
      // After saving, fetch the updated data
      const { data: updatedData, error: fetchError } = await getHealthData(userId);
      
      if (fetchError) throw fetchError;
      
      set({ 
        metrics: updatedData || [],
        isLoading: false,
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error saving health data',
        isLoading: false,
      });
    }
  },
}));