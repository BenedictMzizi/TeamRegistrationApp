import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminDashboard({ onLogout }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setRegistrations(data);
    setLoading(false);
  };

  const handleApprove = async (reg) => {
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ name: reg.name, email: reg.email, is_admin: false }]);

    if (insertError) {
      alert('Failed to approve: ' + insertError.message);
      return;
    }

    await supabase.from('registrations').delete().eq('id', reg.id);
    fetchRegistrations();
  };

  const handleReject = async (id) => {
    const { error } = await supabase.from('registrations').delete().eq('id', id);
    if (error) {
      alert('Failed to reject: ' + error.message);
      return;
    }

    fetchRegistrations();
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <button onClick={onLogout} className="bg-red-600 text-white px-4 py-1 rounded">
          Logout
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : registrations.length === 0 ? (
        <p>No pending registrations.</p>
      ) : (
        <ul>
          {registrations.map((reg) => (
            <li key={reg.id} className="border p-3 mb-3 rounded shadow">
              <p><strong>{reg.name}</strong> — {reg.email}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleApprove(reg)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(reg.id)}
                  className="bg-gray-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
