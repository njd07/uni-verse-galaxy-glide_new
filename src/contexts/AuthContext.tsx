
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, testSupabaseConnection } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  testConnection: () => Promise<{ success: boolean; error?: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Test connection first
        await testSupabaseConnection();
        
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Session retrieval error:", error.message);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error: any) {
        console.error("Error initializing auth:", error.message);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log("Auth state changed:", event);
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const testConnection = async () => {
    return await testSupabaseConnection();
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log("Attempting to sign in with:", email);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error("Sign in error:", error);
        throw error;
      }
      
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Sign in error details:", error);
      let errorMsg = "Failed to sign in. Please check your internet connection and try again.";
      if (error.message) {
        errorMsg = error.message;
      } else if (error.error_description) {
        errorMsg = error.error_description;
      }
      
      toast({
        title: "Sign in failed",
        description: errorMsg,
        variant: "destructive",
        duration: 5000,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    setLoading(true);
    try {
      console.log("Attempting to sign up with:", email, "and username:", username);
      
      // Test connection before sign up
      const connectionTest = await testSupabaseConnection();
      if (!connectionTest.success) {
        throw new Error("Cannot connect to Supabase. Please check your internet connection.");
      }
      
      // Create the user
      const { error: signUpError, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: { username },
          emailRedirectTo: window.location.origin
        }
      });
      
      if (signUpError) {
        console.error("Sign up error:", signUpError);
        throw signUpError;
      }
      
      toast({
        title: "Account created!",
        description: data.user ? "You've successfully signed up." : "Please check your email to confirm your account.",
        duration: 5000,
      });
    } catch (error: any) {
      console.error("Sign up error details:", error);
      let errorMsg = "Failed to create account. Please check your internet connection and try again.";
      
      if (error.message) {
        errorMsg = error.message;
      } else if (error.error_description) {
        errorMsg = error.error_description;
      }
      
      toast({
        title: "Sign up failed",
        description: errorMsg,
        variant: "destructive",
        duration: 5000,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast({
        title: "Sign out failed",
        description: error.message || "Failed to sign out. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut, testConnection }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
