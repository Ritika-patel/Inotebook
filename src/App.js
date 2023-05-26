import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Users from './components/Users'
import Alert from './components/Alert'
import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NoteState from './context/notes/NoteState';


function App() {
  return (
    <NoteState>
    <Router>
      <Navbar/>
      <Alert message="React course"/>
      <div className="container">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='users/' element={<Users />} />
      </Routes>
      </div>
    </Router>
    </NoteState>
  )
}


export default App

