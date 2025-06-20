import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import RegistrationForm from './components/RegistrationForm';

function App() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setAdmin(session.user);
      }
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAdmin(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return admin ? (
    <AdminDashboard onLogout={() => setAdmin(null)} />
  ) : (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <AdminLogin onLogin={setAdmin} />
      <hr />
      <RegistrationForm />
    </div>
  );
}

export default App;