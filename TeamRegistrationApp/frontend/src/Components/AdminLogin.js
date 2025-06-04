import React, { useState } from 'react';
import { adminLogin, setToken } from '../api';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await adminLogin(email, password);
      setToken(res.data.token);
      onLogin(res.data.user);
    } catch {
      setError('Invalid login');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <h2 className="text-lg font-semibold mb-2">Admin Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-2 border p-2" placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-2 border p-2" placeholder="Password" />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button className="bg-blue-600 text-white py-2 px-4 rounded">Login</button>
    </form>
  );
}