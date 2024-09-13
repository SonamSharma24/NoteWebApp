import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Example ico
function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const result = await axios('http://localhost:5000/notes');
    setNotes(result.data);
  };

  const addNote = async () => {
    await axios.post('http://localhost:5000/notes', { title });
    setTitle('');
    fetchNotes();
  };
  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/notes/${id}`);
    fetchNotes();
  };
  return (
    <div className="App">
      <div>
        <h1 className="heading">Notes</h1>
        <div className="FlexContainer">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <button onClick={addNote}>Add Note</button>
        </div>
      </div>
      <div className='TitleContainer'>
        {notes.map(note => (
          <div class="Box">
            <div key={note.id} className='note-item'>
              <h2>{note.title}</h2>
              <p>{new Date(note.createTime).toLocaleString()}</p>
              <button onClick={() => deleteNote(note.id)}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
            </div>
        ))}
          
      </div>

    </div>
  );
}

export default App;
