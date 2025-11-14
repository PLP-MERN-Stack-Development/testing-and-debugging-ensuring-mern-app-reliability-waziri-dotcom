import React from 'react';
import { motion } from 'framer-motion';
import BugItem from './BugItem';

export default function BugList({ bugs, onUpdate, onDelete }) {
  if (!bugs || bugs.length === 0) return <div className="card">No bugs reported yet.</div>;

  return (
    <div>
      {bugs.map(bug => (
        <motion.div key={bug._id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} layout>
          <BugItem bug={bug} onUpdate={onUpdate} onDelete={onDelete} />
        </motion.div>
      ))}
    </div>
  );
}

