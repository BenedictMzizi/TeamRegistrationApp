import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    supabase.from('users').select('name, email').then(({ data }) => {
      if (data) setUsers(data);
    });
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Approved Users</h2>
      <ul>
        {users.map((u, i) => (
          <li key={i} className="border p-2 mb-2 rounded">
            {u.name} – {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
