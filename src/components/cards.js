import React, { useState } from 'react';
import NoteDetailCard from './note-detail';

function formatDate(dateString) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

function Card(props) {
  const date = props.date;
  const formattedDate = formatDate(date);
  const truncatedDescription = truncateText(props.description, 100);

  const [isPopout, setIsPopout] = useState(false);
  const togglePopout = () => {
    //setIsPopout(!isPopout);
    NoteDetailCard(props.title, props.description, props.date)
  };

  return (
    //card ${isPopout ? 'popout' : ''}
    <div className="card" onClick={() => props.onCardClick(props.title, props.description, props.date)}>
      <div>
        <h2 className="card-title">{props.title}</h2>
        <p className="card-description">{truncatedDescription}</p>
        <p className="card-date">{formattedDate}</p>
      </div>
      <div className="footer">
        <button onClick={props.onDelete}>Delete</button>
      </div>
  </div>
  );
}

export default Card;
