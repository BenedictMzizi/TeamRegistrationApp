import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) throw error;

      onLogin(data.user);
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
  };

  function loadDemoAdmin() {
    setEmail('bennydrizi@gmail.com');
    setPassword('password');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Login</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      <button>Login</button>

      {error && <p>{error}</p>}

      <hr style={{ margin: "20px 0" }} />

      <div style={{ fontSize: 13 }}>
        <h4>Demo Access</h4>

        <div
          onClick={loadDemoAdmin}
          style={{
            cursor: "pointer",
            color: "#2563eb",
            fontWeight: "bold"
          }}
        >
          Load Demo Admin Account
        </div>


      </div>
    </form>
  );
}
