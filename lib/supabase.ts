import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with dummy values if env vars are not set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy-supabase-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-anon-key';

// Create a mock supabase client that will work in build time
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
});

// Mock auth state for build time
supabase.auth = {
  ...supabase.auth,
  getSession: () => Promise.resolve({ data: { session: null }, error: null }),
  onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
  signUp: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
  signOut: () => Promise.resolve({ error: null }),
  getUser: () => Promise.resolve({ data: { user: null }, error: null })
} as any;

// Auth functions
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Data functions
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const getIncidents = async () => {
  const { data, error } = await supabase.from('incidents').select('*');
  return { data, error };
};

export const getInspections = async () => {
  const { data, error } = await supabase.from('inspections').select('*');
  return { data, error };
};
