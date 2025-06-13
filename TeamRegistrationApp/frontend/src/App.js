import React, { useEffect, useState } from 'react';
import { supabase } from '.TeamRegistrationApp/frontend/src/supabaseClient.js';
import { AdminLogin } from '.TeamRegistrationApp/frontend/src/Components/AdminLogin.js';
import { AdminDashboard } from '.TeamRegistrationApp/frontend/src/Components/AdminDashboard.js';
import { RegistrationForm } from '.TeamRegistrationApp/frontend/src/Components/RegistrationForm.js';

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

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return admin ? (
    <AdminDashboard onLogout={() => setAdmin(null)} />
  ) : (
    <div className="p-4 max-w-xl mx-auto">
      <AdminLogin onLogin={setAdmin} />
      <hr className="my-6" />
      <RegistrationForm />
    </div>
  );
}

export default App;
