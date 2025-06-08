import React, { useState, useEffect } from 'react';
import RegisterForm from './Components/RegistrationForm';
import AdminLogin from './Components/AdminLogin';
import AdminDashboard from './Components/AdminDashboard';
import { supabase } from './supabaseClient';

function App() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error.message);
      } else if (data?.session?.user) {
        setAdmin(data.session.user);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setAdmin(session.user);
      } else {
        setAdmin(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    } else {
      setAdmin(null);
    }
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
            <button
              onClick={handleLogout}
              className="mt-2 px-4 py-2 bg-gray-700 text-white rounded"
            >
              Logout
            </button>
          </div>
          <AdminDashboard />
        </>
      )}
    </div>
  );
}

export default App;
