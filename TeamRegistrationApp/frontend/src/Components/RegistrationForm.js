import React, { useState } from 'react';
import { registerUser } from '../api';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(name);
    setMessage('Registration submitted!');
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <h2 className="text-lg font-semibold mb-2">Register for Team</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-2 border p-2" placeholder="Your name" required />
      <button className="bg-blue-600 text-white py-2 px-4 rounded">Register</button>
      {message && <p className="text-green-600 mt-2">{message}</p>}
    </form>
  );
}