
import { createClient } from '@supabase/supabase-js'

// Try to get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// For development/fallback purposes - these should be replaced with actual values
// from your Supabase project
const fallbackUrl = supabaseUrl || 'https://your-supabase-project-url.supabase.co'
const fallbackAnonKey = supabaseAnonKey || 'your-supabase-anon-key'

console.log('Supabase URL:', fallbackUrl)
console.log('Using fallback Supabase credentials:', !supabaseUrl || !supabaseAnonKey)

// Create the Supabase client
export const supabase = createClient(fallbackUrl, fallbackAnonKey)

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey
}
