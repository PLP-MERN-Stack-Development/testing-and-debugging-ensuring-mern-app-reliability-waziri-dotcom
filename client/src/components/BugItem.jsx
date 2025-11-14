import React from 'react';

export default function BugItem({ bug, onUpdate, onDelete }) {
  const toggleStatus = () => {
    const next = bug.status === 'open' ? 'in-progress' : bug.status === 'in-progress' ? 'resolved' : 'resolved';
    onUpdate(bug._id, { status: next });
  };
  return (
    <div className="card" style={{marginTop:8}}>
      <div><strong>{bug.title}</strong> <small>({bug.severity})</small></div>
      <p>{bug.description}</p>
      <div>
        <small>Status: {bug.status}</small>
        <button onClick={toggleStatus} style={{marginLeft:8}}>Advance</button>
        <button onClick={() => onDelete(bug._id)} style={{marginLeft:8}}>Delete</button>
      </div>
    </div>
  );
}
