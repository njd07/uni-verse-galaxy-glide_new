
import { supabase } from './supabase';

export type UserBasicInfo = {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
};

export const getUsersByEmail = async (email: string): Promise<UserBasicInfo[]> => {
  try {
    const { data, error } = await supabase.rpc('search_users_by_email', { 
      search_email: email 
    });
    
    if (error) {
      console.error('Error searching users:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const getCurrentUserProfile = async () => {
  try {
    const { data: session } = await supabase.auth.getSession();
    
    if (!session.session?.user) {
      return null;
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.session.user.id)
      .single();
      
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error getting current user profile:', error);
    return null;
  }
};
