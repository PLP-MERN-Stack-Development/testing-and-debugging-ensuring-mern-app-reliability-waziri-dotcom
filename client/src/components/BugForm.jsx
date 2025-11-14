import React, { useState } from 'react';

export default function BugForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('low');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title required');
    // optimistic UI: create local object, call API
    const payload = { title, description, severity };
    try {
      const res = await fetch('/api/bugs', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('Failed to create');
      const { data } = await res.json();
      onCreate(data);
      setTitle(''); setDescription(''); setSeverity('low');
    } catch (err) {
      console.error('Create bug failed', err);
      alert('Could not create bug');
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Report a bug</h3>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <select value={severity} onChange={e=>setSeverity(e.target.value)}>
        <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
      </select>
      <button type="submit">Report</button>
    </form>
  );
}
