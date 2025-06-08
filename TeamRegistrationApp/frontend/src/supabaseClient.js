import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://avkvqrtxwqyuqzoekoru.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2a3ZxcnR4d3F5dWd6b2Vrb3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNDMzNTgsImV4cCI6MjA2NDYxOTM1OH0.Xb9j0xPN196l25MZLoqTWGZPXwm4P0hCXQi8PBo6Ws8';

export const supabase = createClient(supabaseUrl, supabaseKey);
