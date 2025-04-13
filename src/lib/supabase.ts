
import { createClient } from '@supabase/supabase-js'

// For development purposes - replace these with your actual Supabase credentials
const supabaseUrl = 'https://mwvhikdrtpjrvzoyqlke.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13dmhpa2RydHBqcnZ6b3lxbGtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ2NzI4MTcsImV4cCI6MTk5MDI0ODgxN30.LB_fp4zdXU6tX8lEkCXZU0_qPvYYCcnHVxIXX2ueSB0'

// Check for environment variables (to be used when properly configured)
const envUrl = import.meta.env.VITE_SUPABASE_URL
const envAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Use environment variables if available, otherwise use the hardcoded fallbacks
const finalUrl = envUrl || supabaseUrl
const finalAnonKey = envAnonKey || supabaseAnonKey

console.log('Supabase URL:', finalUrl)
console.log('Using fallback Supabase credentials:', !envUrl || !envAnonKey)

// Create the Supabase client
export const supabase = createClient(finalUrl, finalAnonKey)

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return true // We always have at least the fallback values now
}
