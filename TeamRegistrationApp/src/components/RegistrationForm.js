import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (!error) setUsers(data);
    else console.error('Fetch error (users):', error.message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('registrations')
      .insert([{ name, email, status: 'pending' }]);
    if (error) {
      setMessage('Aww...Submission failed.');
    } else {
      setMessage(' Registration submitted!');
      setName('');
      setEmail('');
      fetchUsers(); 
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-md p-6 mb-10">
      <h2 className="text-2xl font-bold mb-4">Team Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition">
          Register
        </button>
        {message && <p className="text-sm text-blue-600 mt-1">{message}</p>}
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">Current Members</h3>
        {users.length === 0 ? (
          <p className="text-gray-500">No approved members yet.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user.id}
                className="border border-gray-200 rounded p-3 bg-gray-50"
              >
                <strong>{user.name}</strong> — {user.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
