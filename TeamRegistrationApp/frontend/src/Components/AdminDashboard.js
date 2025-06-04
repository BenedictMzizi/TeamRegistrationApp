import React, { useEffect, useState } from 'react';
import { fetchRegistrations, updateRegistrationStatus } from '../api';

export default function AdminDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRegistrations().then((res) => setData(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await updateRegistrationStatus(id, status);
    const res = await fetchRegistrations();
    setData(res.data);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <table className="w-full border">
        <thead><tr><th>Name</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id} className="border">
              <td className="p-2">{entry.name}</td>
              <td className="p-2">{entry.status}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => updateStatus(entry.id, 'approved')} className="bg-green-500 text-white px-2 py-1 rounded">Approve</button>
                <button onClick={() => updateStatus(entry.id, 'rejected')} className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}