import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminDashboard({ onLogout }) {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    const { data, error } = await supabase.from('registrations').select('*');
    if (error) {
      console.error('Error fetching registrations:', error.message);
    } else {
      setRegistrations(data);
    }
  };

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('registrations')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setRegistrations((prev) =>
        prev.map((reg) =>
          reg.id === id ? { ...reg, status: newStatus } : reg
        )
      );
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded mb-6"
      >
        Logout
      </button>
<pre>{JSON.stringify(registrations, null, 2)}</pre>
      {registrations.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id}>
                <td className="border px-4 py-2">{reg.name}</td>
                <td className="border px-4 py-2">{reg.email}</td>
                <td className="border px-4 py-2">{reg.status}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => updateStatus(reg.id, 'approved')}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => updateStatus(reg.id, 'rejected')}
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
