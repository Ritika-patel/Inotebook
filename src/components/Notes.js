import React, { useEffect } from 'react'
import { useContext } from "react";
import noteContext from "../context/notes/noteContext.js"
import NoteItem from './NoteItem.js';
import AddNote from './AddNote.js';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(()=>{
    getNotes()
  }, [])
  return (
    <>
      <AddNote />
      <div className="">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} />;
        })}
      </div>
    </>

  )
}

export default Notes
