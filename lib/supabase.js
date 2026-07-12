import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let supabaseClient = null;

// Only create the client if we have a real URL (not a placeholder)
if (supabaseUrl.startsWith('http') && supabaseAnonKey.length > 20) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
}

export default supabaseClient;

