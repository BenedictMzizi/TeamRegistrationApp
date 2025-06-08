import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.error('Error fetching users:', error.message);
    } else {
      setUsers(data);
    }
  };
  fetchUsers();
}, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Team Registration App</h1>
      <h2>Users List</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name} - {user.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
