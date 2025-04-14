
import { createClient } from '@supabase/supabase-js'

// For development purposes - replace these with your actual Supabase credentials
const supabaseUrl = 'https://mwvhikdrtpjrvzoyqlke.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13dmhpa2RydHBqcnZ6b3lxbGtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ2NzI4MTcsImV4cCI6MTk5MDI0ODgxN30.LB_fp4zdXU6tX8lEkCXZU0_qPvYYCcnHVxIXX2ueSB0'

// Check for environment variables
const envUrl = import.meta.env.VITE_SUPABASE_URL
const envAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Use provided values or fallback to hardcoded ones
const finalUrl = envUrl || supabaseUrl
const finalAnonKey = envAnonKey || supabaseAnonKey

// Create the Supabase client
export const supabase = createClient(finalUrl, finalAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return Boolean(finalUrl && finalAnonKey)
}

// Test the connection
export const testSupabaseConnection = async () => {
  try {
    const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true })
    return { success: !error, error }
  } catch (error) {
    console.error('Error testing Supabase connection:', error)
    return { success: false, error }
  }
}
