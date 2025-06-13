import React, { useEffect, useState } from 'react';
import { supabase } from '.TeamRegistrationApp/TeamRegistrationApp/frontend/src/supabaseClient';
import AdminLogin from '.TeamRegistrationApp/TeamRegistrationApp/frontend/src/components/AdminLogin';
import AdminDashboard from '.TeamRegistrationApp/TeamRegistrationApp/frontend/src/components/AdminDashboard';
import RegistrationForm from '.TeamRegistrationApp/TeamRegistrationApp/frontend/src/components/RegistrationForm';

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
