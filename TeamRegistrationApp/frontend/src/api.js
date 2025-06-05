import { supabase } from './supabaseClient';

export const registerUser = async (name) => {
  const { data, error } = await supabase.from('registrations').insert([{ name }]);
  if (error) throw error;
  return data;
};

export const fetchRegistrations = async () => {
  const { data, error } = await supabase.from('registrations').select('*');
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


export const adminLogin = async (email, password) => {
  if (email === 'admin@teams.com' && password === 'password') {
    return { token: 'fake-token', user: { email } };
  } else {
    throw new Error('Invalid credentials');
  }
};
