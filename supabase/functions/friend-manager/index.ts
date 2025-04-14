
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.6";

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get auth user ID from the request
    const authHeader = req.headers.get('Authorization') || '';
    if (!authHeader.startsWith('Bearer ')) {
      throw new Error('Missing or invalid authorization token');
    }
    
    // Create a Supabase client with the admin key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Verify the token and get the user
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Invalid token or user not found');
    }
    
    const { action, targetUserId, requestId, status } = await req.json();
    const userId = user.id;
    
    console.log(`Processing ${action} request from ${userId} to ${targetUserId}`);
    
    let result = null;
    
    if (action === 'send_request') {
      // Check if request already exists
      const { data: existingRequest } = await supabase
        .from('friend_requests')
        .select('*')
        .or(`(sender_id.eq.${userId}.and.receiver_id.eq.${targetUserId}),` +
            `(sender_id.eq.${targetUserId}.and.receiver_id.eq.${userId})`)
        .single();
        
      if (existingRequest) {
        return new Response(JSON.stringify({ 
          message: 'Friend request already exists',
          request: existingRequest
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Create a new friend request
      const { data, error } = await supabase
        .from('friend_requests')
        .insert([
          { sender_id: userId, receiver_id: targetUserId, status: 'pending' }
        ])
        .select()
        .single();
        
      if (error) throw error;
      result = data;
    } 
    else if (action === 'update_request') {
      // Update an existing friend request
      const { data: request, error: fetchError } = await supabase
        .from('friend_requests')
        .select('*')
        .eq('id', requestId)
        .single();
        
      if (fetchError || !request) {
        throw new Error('Friend request not found');
      }
      
      // Only the receiver can update the status
      if (request.receiver_id !== userId) {
        throw new Error('Unauthorized to update this request');
      }
      
      const { data, error } = await supabase
        .from('friend_requests')
        .update({ status })
        .eq('id', requestId)
        .select()
        .single();
        
      if (error) throw error;
      
      // If accepted, create friendship entries in both directions
      if (status === 'accepted') {
        const { error: friendshipError } = await supabase
          .from('friendships')
          .insert([
            { user_id: userId, friend_id: request.sender_id },
            { user_id: request.sender_id, friend_id: userId }
          ]);
          
        if (friendshipError) throw friendshipError;
      }
      
      result = data;
    }
    else if (action === 'get_friends') {
      // Get all friends of the user
      const { data, error } = await supabase
        .from('friendships')
        .select(`
          friend_id,
          friend:friend_id (
            id,
            email,
            user_metadata
          )
        `)
        .eq('user_id', userId);
        
      if (error) throw error;
      result = data;
    }
    else if (action === 'get_requests') {
      // Get all pending friend requests for the user
      const { data, error } = await supabase
        .from('friend_requests')
        .select(`
          *,
          sender:sender_id (
            id,
            email,
            user_metadata
          ),
          receiver:receiver_id (
            id,
            email,
            user_metadata
          )
        `)
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      result = data;
    }
    else {
      throw new Error('Invalid action');
    }
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in friend-manager function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
