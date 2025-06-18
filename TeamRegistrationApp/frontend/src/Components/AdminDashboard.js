import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminDashboard({ onLogout }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (!error) setUsers(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Team Registration App</h1>
      <button onClick={handleLogout} className="mb-4 bg-red-600 text-white px-4 py-2 rounded">
        Logout
      </button>
      <h2 className="text-xl font-semibold">Users List</h2>
      <ul className="list-disc pl-5">
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
