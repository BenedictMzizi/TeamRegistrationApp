import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      onLogin(data.user);
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Admin Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full mb-2 border p-2" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full mb-2 border p-2" />
      <button className="bg-blue-600 text-white py-2 px-4 rounded">Login</button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
}