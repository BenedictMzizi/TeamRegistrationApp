// src/App.js
import React, { useState, useEffect } from 'react';
import RegisterForm from './Components/RegistrationForm';
import AdminLogin from './Components/AdminLogin';
import AdminDashboard from './Components/AdminDashboard';
import { supabase } from './supabaseClient';

function App() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // Check for active session on load
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) setAdmin(session.user);
    };

    getSession();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setAdmin(session.user);
      } else {
        setAdmin(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAdmin(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Team Registration App</h1>

      {!admin ? (
        <>
          <RegisterForm />
          <div className="mt-8">
            <AdminLogin onLogin={setAdmin} />
          </div>
        </>
      ) : (
        <>
          <div className="text-center mb-4">
            <p className="text-gray-700">Logged in as: {admin.email}</p>
            <button onClick={handleLogout} className="mt-2 px-4 py-2 bg-gray-700 text-white rounded">Logout</button>
          </div>
          <AdminDashboard />
        </>
      )}
    </div>
  );
}

export default App;
