import React, { useEffect, useState } from 'react';
import ThemeToggle from './components/ThemeToggle';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';

export default function App(){
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchBugs() {
    try {
      setLoading(true);
      const res = await fetch('/api/bugs');
      if (!res.ok) throw new Error('Failed to fetch');
      const { data } = await res.json();
      setBugs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{ fetchBugs(); }, []);

  const handleCreate = (newBug) => setBugs(b => [newBug, ...b]);
  const handleUpdate = async (id, updates) => {
    try {
      const res = await fetch(`/api/bugs/${id}`, { method: 'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify(updates) });
      if (!res.ok) throw new Error('Update failed');
      const { data } = await res.json();
      setBugs(b => b.map(x => x._id === id ? data : x));
    } catch (err) {
      alert('Update error');
    }
  };
  const handleDelete = async (id) => {
    if (!confirm('Delete this bug?')) return;
    try {
      const res = await fetch(`/api/bugs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setBugs(b => b.filter(x => x._id !== id));
    } catch (err) {
      alert('Delete error');
    }
  };

  return (
    <ErrorBoundary>
      <div className="container">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h1>JOWI — Bug Tracker</h1>
          <ThemeToggle />
        </div>

        <BugForm onCreate={handleCreate} />
        {loading ? <div className="card">Loading...</div> : error ? <div className="card">Error: {error}</div> : <BugList bugs={bugs} onUpdate={handleUpdate} onDelete={handleDelete} />}
      </div>
    </ErrorBoundary>
  );
}
