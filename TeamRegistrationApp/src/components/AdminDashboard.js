import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminDashboard({ onLogout }) {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching registrations:', error.message);
    } else {
      setRegistrations(data);
    }
  };

  const approveUser = async (reg) => {
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ name: reg.name, email: reg.email, created_at: new Date().toISOString() }]);

    if (!insertError) {
      const { error: deleteError } = await supabase
        .from('registrations')
        .delete()
        .eq('id', reg.id);

      if (!deleteError) {
        setRegistrations((prev) => prev.filter((r) => r.id !== reg.id));
      } else {
        alert('Failed to remove from registrations: ' + deleteError.message);
      }
    } else {
      alert('Failed to approve user: ' + insertError.message);
    }
  };

  const rejectUser = async (id) => {
    const { error } = await supabase.from('registrations').delete().eq('id', id);
    if (!error) {
      setRegistrations((prev) => prev.filter((r) => r.id !== id));
    } else {
      alert('Failed to reject user: ' + error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {registrations.length === 0 ? (
        <p>No pending registrations.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id}>
                <td className="border px-4 py-2">{reg.name}</td>
                <td className="border px-4 py-2">{reg.email}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => approveUser(reg)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-yellow-600 text-white px-3 py-1 rounded"
                    onClick={() => rejectUser(reg.id)}
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
