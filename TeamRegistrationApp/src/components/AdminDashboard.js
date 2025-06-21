import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminDashboard({ onLogout }) {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    const { data, error } = await supabase.from('registrations').select('*');
    if (!error) setRegistrations(data);
    else console.error('Error fetching registrations:', error.message);
  };

  const updateStatus = async (reg, newStatus) => {
    if (!reg?.id) return console.error('Invalid registration data.');

    if (newStatus === 'approved') {
      const { error: insertError } = await supabase
        .from('users')
        .insert([{ name: reg.name, email: reg.email }]);
      if (insertError) return console.error('Insert error:', insertError.message);
    }

    const { error } = await supabase.from('registrations').delete().eq('id', reg.id);
    if (!error) {
      setRegistrations((prev) => prev.filter((r) => r.id !== reg.id));
    } else {
      console.error('Delete error:', error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </div>

      {registrations.length === 0 ? (
        <p className="text-gray-500">No pending registrations.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id}>
                <td className="border px-4 py-2">{reg.name}</td>
                <td className="border px-4 py-2">{reg.email}</td>
                <td className="border px-4 py-2 capitalize">{reg.status}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => updateStatus(reg, 'approved')}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(reg, 'rejected')}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
