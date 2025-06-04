import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://avkvqrtxwqyugzoekoru.supabase.co'; // Your project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';  // Your anon public key

export const supabase = createClient(supabaseUrl, supabaseKey);
