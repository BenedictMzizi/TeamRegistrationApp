import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('registrations').insert([{ name, email, status: 'pending' }]);
    if (error) {
      setMessage('Submission failed.');
    } else {
      setMessage('Registration submitted!');
      setName('');
      setEmail('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <button>Register</button>
      {message && <p>{message}</p>}
    </form>
  );
}
