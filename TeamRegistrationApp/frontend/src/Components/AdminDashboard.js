import React, { useEffect, useState } from 'react';
import { fetchRegistrations, updateRegistrationStatus } from './api.js';
import supabase from './supabaseClient.js';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const handleLogout = async () => {
  await supabase.auth.signOut();
  navigate('/');
};

export default function AdminDashboard({ onLogout }) {
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState('');

  const loadRegistrations = async () => {
    try {
      const data = await fetchRegistrations();
      setRegistrations(data);
    } catch (err) {
      setError('Error loading registrations');
    }
  };

  const handleUpdate = async (id, status) => {
    try {
      await updateRegistrationStatus(id, status);
      loadRegistrations();
    } catch (err) {
      setError('Failed to update status');
    }
  };

  useEffect(() => {
    loadRegistrations();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <ul>
        {registrations.map((r) => (
          <li key={r.id} className="mb-2 border p-2 rounded">
            <p><strong>Name:</strong> {r.name}</p>
            <p><strong>Status:</strong> {r.status}</p>
            <div className="space-x-2 mt-2">
              <button onClick={() => handleUpdate(r.id, 'approved')} className="bg-green-600 text-white px-2 py-1 rounded">Approve</button>
              <button onClick={() => handleUpdate(r.id, 'rejected')} className="bg-red-600 text-white px-2 py-1 rounded">Reject</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
