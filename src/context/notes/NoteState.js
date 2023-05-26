import React from "react";
import NoteContext from "./noteContext";
import { useState } from 'react';

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = React.useState(notesInitial);

  //add all notes
  const getNotes = async () => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzODU2NDVmMDYwZGRlOGU5N2RlZWJmIn0sImlhdCI6MTY4MTU0NzcyNn0.X2o39tnk8VH5kCL5MReZ0lZnL-xQPkESlf_Dc_m47hM"
      }
    });
    const json = await response.json();
    console.log(json)
    setNotes(json)
  };




  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzODU2NDVmMDYwZGRlOGU5N2RlZWJmIn0sImlhdCI6MTY4MTU0NzcyNn0.X2o39tnk8VH5kCL5MReZ0lZnL-xQPkESlf_Dc_m47hM"
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = {
      "_id": "645e849555e166a5ec3b260555665",
      "user": "64385645f060dde8e97deebf",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-05-12T18:25:25.234Z",
      "__v": 0
    };

    setNotes([...notes, note]);
  };

  // Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzODU2NDVmMDYwZGRlOGU5N2RlZWJmIn0sImlhdCI6MTY4MTU0NzcyNn0.X2o39tnk8VH5kCL5MReZ0lZnL-xQPkESlf_Dc_m47hM"
      },
      body: JSON.stringify({ id }),
    });

    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzODU2NDVmMDYwZGRlOGU5N2RlZWJmIn0sImlhdCI6MTY4MTU0NzcyNn0.X2o39tnk8VH5kCL5MReZ0lZnL-xQPkESlf_Dc_m47hM"
      },
      body: JSON.stringify({ id, title, description, tag }),
    });

    const updatedNote = {
      "_id": id,
      "user": "64385645f060dde8e97deebf",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-05-12T18:25:25.234Z",
      "__v": 0
    };

    const newNotes = notes.map((note) => (note._id === id ? updatedNote : note));
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
