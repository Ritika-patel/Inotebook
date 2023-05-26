import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext.js"

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const {deleteNote } = context;
    const { note } = props;

    return (
        <div className='row my-3'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className='far fa-trash-alt mx-2' onClick={() => { deleteNote(note._id) }}></i>
                    <i className='far fa-edit'></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
