import { supabase } from '.TeamRegistrationApp/TeamRegistrationApp/frontend/src/supabaseClient';

export const registerUser = async (name) => {
  const { data, error } = await supabase
    .from('registrations')
    .insert([{ name, status: 'pending' }]);

  if (error) throw error;
  return data;
};

export const fetchRegistrations = async () => {
  const { data, error } = await supabase
    .from('registrations')
    .select('*');

  if (error) throw error;
  return data;
};

export const updateRegistrationStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('registrations')
    .update({ status })
    .eq('id', id);

  if (error) throw error;
  return data;
};

//
export const adminLogin = async (email, password) => {
  
  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return user;
};
