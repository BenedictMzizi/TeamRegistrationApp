import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function PublicUsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false });
    if (!error) {
      setUsers(data);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Approved Members</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="border p-2 mb-2">
            <p><strong>{user.name}</strong> — {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
