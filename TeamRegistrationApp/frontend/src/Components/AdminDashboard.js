import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (!error) setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateStatus = async (id, status) => {
    await supabase.from('users').update({ status }).eq('id', id);
    fetchUsers();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      {users.map((user) => (
        <div key={user.id} className="border p-3 mb-2 rounded">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Status:</strong> {user.status}</p>
          <button className="bg-green-500 text-white px-2 py-1 mr-2" onClick={() => updateStatus(user.id, 'approved')}>Approve</button>
          <button className="bg-red-500 text-white px-2 py-1" onClick={() => updateStatus(user.id, 'rejected')}>Reject</button>
        </div>
      ))}
    </div>
  );
}