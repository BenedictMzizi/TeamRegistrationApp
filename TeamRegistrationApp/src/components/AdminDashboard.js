import React from 'react';

export default function AdminDashboard({ onLogout }) {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}