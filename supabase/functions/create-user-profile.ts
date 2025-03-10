
// This Edge Function will be triggered when a new user signs up
// It will create a user profile in the user_profiles table

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';

serve(async (req) => {
  // Create a Supabase client with the Auth context from the request
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  // Get the user from the event
  const { record } = await req.json();
  
  if (!record?.id) {
    return new Response(JSON.stringify({ error: 'No user record found in the request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Create a profile for the user
    const { error } = await supabase
      .from('user_profiles')
      .insert({
        id: record.id,
        full_name: record.raw_user_meta_data?.full_name || '',
        email: record.email,
      });
    
    if (error) throw error;
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
