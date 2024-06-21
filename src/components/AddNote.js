import React from 'react'
import { useContext,useState} from 'react';
import NoteContext from '../context/notes/NoteContext';
export default function AddNote() {
    const context = useContext(NoteContext);   // this add note is used to add the new note of the user or to show the new note of the user
    const { addNote } = context;
    const [note,setNote]=useState({title:"",Description:"",tag:"default"})
    const handleclick=(e)=>{
            e.preventDefault();
            addNote(note.title,note.Description,note.tag);
    }
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add your Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" aria-describedby="emailHelp" onChange={onchange} name="title" placeholder="title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="Description">Description</label>
                    <input type="text" className="form-control" id="Description" onChange={onchange} name="Description" placeholder="Description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="tag" onChange={onchange} name="tag" placeholder="tag" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleclick}>Add</button>
            </form>

        </div>
    )
}
