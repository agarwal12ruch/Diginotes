import React, { useEffect, useRef } from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from "../components/NoteItem"
export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, getNote } = context;
  useEffect(() => {
    getNote();
  }, []);
  const ref=useRef(null);
  const updateNotes = (notes) => {
      ref.current.click();
  }
  return (
    <>
      <button ref={ref} type="button"  className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your Note</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id}  updateNotes={updateNotes} notes={note} />
        })}
      </div>
    </>
  )
}
