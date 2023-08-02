function NoteDetailCard({ title, description, date, onClose }) {
    return (
      <div className="note-detail-card popout">
        <h2>{title}</h2>
        <p className="note-date">Date: {date}</p>
        <p className="note-description">{description}</p>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    );
  }
  
  export default NoteDetailCard;
  