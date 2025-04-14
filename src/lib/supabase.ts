
import { createClient } from '@supabase/supabase-js'

// Use the correct Supabase credentials for the connected project
const supabaseUrl = 'https://xxvtdytnmjdytfruqjws.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4dnRkeXRubWpkeXRmcnVxandzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MDY3NTEsImV4cCI6MjA2MDE4Mjc1MX0.qYl7-JkoSyTawWy0ShEjTb8V6ZODhDOlvb9NWTdYqjU'

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey)
}

// Test the connection
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.auth.getSession()
    return { success: !error, error }
  } catch (error) {
    console.error('Error testing Supabase connection:', error)
    return { success: false, error }
  }
}
