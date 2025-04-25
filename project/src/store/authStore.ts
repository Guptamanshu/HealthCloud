import { create } from 'zustand';
import { getCurrentUser, signIn, signOut, signUp } from '../lib/supabase';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await signIn(email, password);
      
      if (error) throw error;
      
      if (data?.user) {
        set({ 
          user: {
            id: data.user.id,
            email: data.user.email || '',
          },
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred during login',
        isLoading: false,
        isAuthenticated: false,
      });
    }
  },

  register: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await signUp(email, password);
      
      if (error) throw error;
      
      if (data?.user) {
        set({ 
          user: {
            id: data.user.id,
            email: data.user.email || '',
          },
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred during registration',
        isLoading: false,
        isAuthenticated: false,
      });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      const { error } = await signOut();
      if (error) throw error;
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred during logout',
        isLoading: false,
      });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const { user, error } = await getCurrentUser();
      if (error) throw error;
      
      if (user) {
        set({ 
          user: {
            id: user.id,
            email: user.email || '',
          },
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ 
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred while checking authentication',
        isLoading: false,
        isAuthenticated: false,
        user: null,
      });
    }
  },
}));