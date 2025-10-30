import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Database } from './types';
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://efwjgqwxlccjvbxhahnm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmd2pncXd4bGNjanZieGhhaG5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4NTg1NzAsImV4cCI6MjA3NzQzNDU3MH0.9DFb0-sowNB7ZTRedKAJvJnGIdQor3ocaePSNhhIaeI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
