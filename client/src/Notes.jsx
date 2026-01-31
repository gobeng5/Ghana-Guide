// See full implementation in the complete download
import { useState, useEffect } from 'react';
import { notesAPI } from '../utils/api';
import { Link } from 'react-router-dom';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [filters, setFilters] = useState({ gradeLevel: '', subject: '', search: '' });
  
  useEffect(() => {
    fetchNotes();
  }, [filters]);
  
  const fetchNotes = async () => {
    try {
      const response = await notesAPI.getAll(filters);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-display font-bold mb-8">Study Notes</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {notes.map(note => (
          <Link key={note._id} to={`/notes/${note._id}`} className="card hover:scale-105 transition-transform">
            <h3 className="font-semibold text-lg mb-2">{note.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{note.subject} - {note.topic}</p>
            <span className={`badge badge-${note.difficulty.toLowerCase()}`}>{note.difficulty}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
