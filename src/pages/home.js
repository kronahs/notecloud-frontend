import React, { useEffect, useState } from 'react';
import Card from "../components/cards";
import api from '../api/notes';
import PopoutForm from '../components/popout';
import logo from '../assets/logo3.png'
import {FaCog,FaMoon} from 'react-icons/fa'
import NoteDetailCard from '../components/note-detail';

function HomePage() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [notes, setNotes] = useState([]);

  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState({title: '', description: '', date: ''})

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await api.get('/notes');
      setNotes(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else {
        console.log(error.message);
      }
    }
  };

  const addNotes = async (title, desc, category) => {
    try {
      await api.post('/note', {
        title: title,
        description: desc,
        category: category
      });

      fetchNotes();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else {
        console.log(error.message);
      }
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await api.delete(`/note/${noteId}`);
      fetchNotes();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else {
        console.log(error.message);
      }
    }
  };


  //for Adding Note
  const handleFormCancel = () => {
    setIsFormVisible(false);
  };

  const handleFormSubmit = (title, description, category) => {
    addNotes(title, description, category);
    setIsFormVisible(false);
  };

  const handleDelete = (noteId) => {
    deleteNote(noteId);
  };

  function handleAdd() {
    setIsFormVisible(true);
  }


//For OncLICK OF CARD
  const handelCardClick = (title,description,date) => {
    setSelectedNote({ title, description, date });
    setIsDetailVisible(true);
  }

  const handleNoteDetailClose = () => {
    setIsDetailVisible(false);
  };

  return (
    <div className="container">
      <div className="header">
        <img className='header-logo' src={logo} alt="NoteCloud-logo" />
        <FaMoon className='settings-header'/>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>

      <div className="categories">
        <div className="cat">
          <button className="category-btn-active">All</button>
          <button className="category-btn">Projects</button>
          <button className="category-btn">Business</button>
        </div>
        <button className="add-button" onClick={handleAdd}>Add</button>
        {isFormVisible && (
          <PopoutForm
            isVisible={isFormVisible}
            onAdd={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        )}
      </div>

      <div className="card-grid">
        {notes.map((note, index) => {
          return (
            <Card
              key={index}
              onDelete={() => handleDelete(note._id)}
              title={note.title}
              description={note.description}
              date={note.createdAt}
              onCardClick={() => handelCardClick(note.title, note.description,note.createdAt)}
            />
          );
        })}
      </div>
      {isDetailVisible && (
        <div className="popout-overlay">
          <NoteDetailCard
            title={selectedNote.title}
            description={selectedNote.description}
            date={selectedNote.date}
            onClose={handleNoteDetailClose}
          />
        </div>
      )}
    </div>
  );
}

export default HomePage;
