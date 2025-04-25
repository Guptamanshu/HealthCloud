import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// We'll need to replace these with actual environment variables for production
const supabaseUrl ='https://jptzycutgyhhuajfyppj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwdHp5Y3V0Z3loaHVhamZ5cHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MTM5ODksImV4cCI6MjA2MTA4OTk4OX0.ogLR7KLmTToZDW_vjwTfTB_Emh6xnCWE7_MOZPsjPf8';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please set up environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { 
    user: data?.session?.user || null,
    error 
  };
};

// Health data functions
export const saveHealthData = async (userId: string, healthData: any) => {
  const { data, error } = await supabase
    .from('health_metrics')
    .insert([
      { 
        user_id: userId,
        ...healthData,
        created_at: new Date()
      }
    ]);
  return { data, error };
};

export const getHealthData = async (userId: string) => {
  const { data, error } = await supabase
    .from('health_metrics')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data, error };
};

export const updateUserProfile = async (userId: string, profile: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert([
      { 
        id: userId,
        ...profile,
        updated_at: new Date()
      }
    ]);
  return { data, error };
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};