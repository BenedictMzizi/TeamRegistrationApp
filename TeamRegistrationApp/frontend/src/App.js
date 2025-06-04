import React, { useState } from 'react';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import RegisterForm from './components/RegisterForm';

function App() {
  const [admin, setAdmin] = useState(null);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Team Registration</h1>
      {!admin ? (
        <>
          <RegisterForm />
          <AdminLogin onLogin={setAdmin} />
        </>
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
}

export default App;