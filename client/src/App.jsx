import { useState } from 'react'
import {Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import './App.css'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import ProjectDesc from './components/ProjectDesc/ProjectDesc';

function App() {


  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/project/:projectId" element={<ProjectDesc/>} />
      </Routes>
    </>
  )
}

export default App
