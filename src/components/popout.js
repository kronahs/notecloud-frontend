import React, { useState } from 'react';
import '../style/popout.css'

function PopoutForm({ isVisible, onAdd, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(title, description, category);
    setTitle('');
    setDescription('');
    setCategory('');
  };

  const handleCancel = () => {
    onCancel();
    setTitle('');
    setDescription('');
    setCategory('');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="popout-form-container">
      <form className="popout-form" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} cols="30" rows="10"></textarea>
        
        <label>Category:</label>
        <select id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Business">Business</option>
            <option value="Projects">Projects</option>
            <option value="Personal">Personal</option>
        </select>
        <div>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="submit-button" type="submit">
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
}

export default PopoutForm;
