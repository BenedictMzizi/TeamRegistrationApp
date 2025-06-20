import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminDashboard({ onLogout }) {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    const { data: regData } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    const combined = [
      ...(regData || []).map((r) => ({ ...r, source: 'registrations' })),
      ...(userData || []).map((u) => ({ ...u, source: 'users' }))
    ];

    setRegistrations(combined);
  };

  const handleApprove = async (reg) => {
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ name: reg.name, email: reg.email, created_at: new Date().toISOString() }]);

    if (!insertError) {
      await supabase.from('registrations').delete().eq('id', reg.id);
      fetchRegistrations();
    } else {
      alert('Failed to approve: ' + insertError.message);
    }
  };

  const handleReject = async (id) => {
    const { error } = await supabase.from('registrations').delete().eq('id', id);
    if (!error) {
      fetchRegistrations();
    } else {
      alert('Failed to reject: ' + error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-1 rounded">Logout</button>
      </div>

      {registrations.length === 0 ? (
        <p>No registrations or users found.</p>
      ) : (
        <ul>
          {registrations.map((reg) => (
            <li key={reg.id} className="border p-2 mb-2">
              <p><strong>{reg.name}</strong> — {reg.email}</p>
              {reg.source === 'registrations' && (
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
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

