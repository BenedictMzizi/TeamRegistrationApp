import React from 'react';
import { supabase } from '../supabaseClient';

export default function AdminDashboard({ onLogout }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
      <button onClick={handleLogout} className="mt-4 bg-red-600 text-white py-2 px-4 rounded">
        Logout
      </button>
    </div>
  );
}