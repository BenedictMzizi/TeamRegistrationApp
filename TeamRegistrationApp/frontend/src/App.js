import React from 'react';
import RegistrationForm from './RegistrationForm';
import AdminPanel from './AdminPanel';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Team Registration App</h1>
      <RegistrationForm />
      <hr />
      <AdminPanel />
    </div>
  );
}

export default App;
