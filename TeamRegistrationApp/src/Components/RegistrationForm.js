import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('users').insert([{ name, email, status: 'pending' }]);
    if (error) {
      setMessage('Submission failed.');
    } else {
      setMessage('Registration submitted!');
      setName('');
      setEmail('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Team Registration</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required className="w-full mb-2 border p-2" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full mb-2 border p-2" />
      <button className="bg-green-600 text-white py-2 px-4 rounded">Register</button>
      {message && <p className="mt-2 text-blue-600">{message}</p>}
    </form>
  );
}