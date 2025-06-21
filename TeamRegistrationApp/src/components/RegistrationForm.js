import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    const { data, error } = await supabase
      .from('registrations')
      .select('*'); // Removed .order('created_at')

    if (!error) {
      setRegistrations(data);
    } else {
      console.error('Fetch error:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('registrations')
      .insert([{ name, email, status: 'pending' }]);

    if (error) {
      setMessage('Submission failed.');
    } else {
      setMessage('Registration submitted!');
      setName('');
      setEmail('');
      fetchRegistrations(); // Refresh the list
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">Register</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
          className="w-full mb-2 border p-2"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full mb-2 border p-2"
        />
        <button className="bg-green-600 text-white py-2 px-4 rounded">
          Register
        </button>
        {message && <p className="mt-2 text-blue-600">{message}</p>}
      </form>

      <h3 className="text-md font-semibold mt-4 mb-2">Current Registrations</h3>
      {registrations.length === 0 ? (
        <p>No users yet.</p>
      ) : (
        <ul className="list-disc pl-4">
          {registrations.map((reg) => (
            <li key={reg.id}>
              <strong>{reg.name}</strong> — {reg.email} ({reg.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
