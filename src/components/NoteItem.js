import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
export default function NoteItem(props) {
  const context = useContext(NoteContext);   // this add note is used to add the new note of the user or to show the new note of the user
  const { deletenote } = context; //calling delete function from notesstate context
  const { notes, updateNotes } = props;
  const handledelete = () => { // to delete note of a given id on clicking on a trash button
    deletenote(notes._id);
    // props.applyalert("deleted successfully","success")

  }
  const handleedit = () => {
    
    updateNotes(notes)
    console.log("rr")
  }
  return (
    <div className='col-md-3'>
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{notes.title}</h5>
          <p className="card-text"> {notes.Description}</p>
          <svg xmlns="http://www.w3.org/2000/svg" onClick={handledelete} width="24" height="24" viewBox="0 0 24 24" style={{ fill: "rgba(0, 0, 0, 1)", transform: "msFilter" }}><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
          <svg xmlns="http://www.w3.org/2000/svg" onClick={handleedit} width="24" height="24" viewBox="0 0 24 24" style={{ fill: "rgba(0, 0, 0, 1)", transform: "msFilter" }}><path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"></path></svg>

        </div>
      </div>
    </div>
  )
}
