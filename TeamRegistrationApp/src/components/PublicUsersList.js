import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function PublicUsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (!error) {
      setUsers(data);
    } else {
      console.error('Error fetching users:', error.message);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Approved Members</h2>
      {users.length === 0 ? (
        <p>No users yet.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id} className="border p-2 mb-2">
              <p><strong>{user.name}</strong> — {user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
