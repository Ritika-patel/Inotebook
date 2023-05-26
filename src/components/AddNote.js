import React from 'react'
import { useContext, useState } from "react";
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title: "", description: "", tag:"default"})

    const handleClick = (e) =>{
        e.preventDefault()
        addNote(note.title, note.description, note.tag);
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value })
    }
  return (
    <div>
      <div className="container my-3">
      <h2>Add a Note</h2>
      <form>
        <div class="form-group">
          <label htmlFor="Ritika Patel">Title</label>
          <input
            onChange={onChange}
            id="title"
            type="text"
            class="form-control"
            name="title"
            aria-describedby="TitleHelp"
            placeholder="Enter Title"
          />
        </div>
        <div class="form-group">
          <label htmlFor="exampleInputPassword1">description</label>
          <input
            onChange={onChange}
            type="text"
            class="form-control"
            id="desciption"
            name="description"
            placeholder="description"
          />
        </div>

        <button type="submit" class="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
      </div>
    </div>
  )
}

export default AddNote
