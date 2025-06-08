import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('participants').insert([{ name, team, status: 'pending' }]);
    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setMessage('Registration submitted!');
      setName('');
      setTeam('');
    }
  };

  return (
    <div>
      <h2>Register to Join a Team</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required /><br />
        <input placeholder="Team Name" value={team} onChange={(e) => setTeam(e.target.value)} required /><br />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default RegistrationForm;
