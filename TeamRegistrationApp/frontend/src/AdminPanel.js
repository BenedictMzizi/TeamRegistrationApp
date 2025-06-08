import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function AdminPanel() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    const { data } = await supabase.from('participants').select('*').order('created_at', { ascending: false });
    setParticipants(data);
  };

  const updateStatus = async (id, status) => {
    await supabase.from('participants').update({ status }).eq('id', id);
    fetchParticipants();
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      {participants.map((p) => (
        <div key={p.id} style={{ marginBottom: '1rem' }}>
          <strong>{p.name}</strong> - Team: {p.team} - Status: <em>{p.status}</em>
          {p.status === 'pending' && (
            <>
              <button onClick={() => updateStatus(p.id, 'approved')}>Approve</button>
              <button onClick={() => updateStatus(p.id, 'rejected')}>Reject</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;
