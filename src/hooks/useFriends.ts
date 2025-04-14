
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export type FriendRequestStatus = 'pending' | 'accepted' | 'declined';

export interface FriendRequest {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: FriendRequestStatus;
  created_at: string;
  sender?: {
    id: string;
    email?: string;
    user_metadata?: {
      name?: string;
      avatar_url?: string;
    };
  };
  receiver?: {
    id: string;
    email?: string;
    user_metadata?: {
      name?: string;
      avatar_url?: string;
    };
  };
}

export interface Friend {
  id: string;
  name: string;
  email?: string;
  profilePicture?: string;
}

export const useFriends = () => {
  const { user, session } = useAuth();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshFriends = async () => {
    if (!user || !session?.access_token) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Load friends
      const { data: friendsData, error: friendsError } = await supabase.functions.invoke('friend-manager', {
        body: { action: 'get_friends' },
      });
      
      if (friendsError) throw friendsError;
      
      const formattedFriends: Friend[] = friendsData.map((item: any) => ({
        id: item.friend_id,
        name: item.friend?.user_metadata?.name || item.friend?.email?.split('@')[0] || 'Unknown User',
        email: item.friend?.email,
        profilePicture: item.friend?.user_metadata?.avatar_url || `https://i.pravatar.cc/300?u=${item.friend_id}`
      }));
      
      setFriends(formattedFriends);
      
      // Load friend requests
      const { data: requestsData, error: requestsError } = await supabase.functions.invoke('friend-manager', {
        body: { action: 'get_requests' },
      });
      
      if (requestsError) throw requestsError;
      
      setFriendRequests(requestsData);
    } catch (err: any) {
      console.error('Error fetching friends data:', err);
      setError(err.message || 'Failed to load friends data');
    } finally {
      setLoading(false);
    }
  };

  const sendFriendRequest = async (targetUserId: string) => {
    if (!user || !session?.access_token) return null;
    
    try {
      const { data, error } = await supabase.functions.invoke('friend-manager', {
        body: { 
          action: 'send_request',
          targetUserId
        },
      });
      
      if (error) throw error;
      
      // Refresh friend requests
      await refreshFriends();
      
      return data;
    } catch (err: any) {
      console.error('Error sending friend request:', err);
      setError(err.message || 'Failed to send friend request');
      return null;
    }
  };

  const updateFriendRequest = async (requestId: string, status: FriendRequestStatus) => {
    if (!user || !session?.access_token) return false;
    
    try {
      const { error } = await supabase.functions.invoke('friend-manager', {
        body: { 
          action: 'update_request',
          requestId,
          status
        },
      });
      
      if (error) throw error;
      
      // Refresh friend requests and friends
      await refreshFriends();
      
      return true;
    } catch (err: any) {
      console.error('Error updating friend request:', err);
      setError(err.message || 'Failed to update friend request');
      return false;
    }
  };

  useEffect(() => {
    if (user && session?.access_token) {
      refreshFriends();
    } else {
      setFriends([]);
      setFriendRequests([]);
      setLoading(false);
    }
  }, [user, session?.access_token]);

  return {
    friends,
    friendRequests,
    loading,
    error,
    refreshFriends,
    sendFriendRequest,
    updateFriendRequest,
    incomingRequests: friendRequests.filter(req => req.receiver_id === user?.id && req.status === 'pending'),
    outgoingRequests: friendRequests.filter(req => req.sender_id === user?.id)
  };
};
