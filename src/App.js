import * as React from "react";
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About"
import Home from "./components/Home";
import Alert from "./components/Alert";
import NoteState from "./context/notes/NoteState"
import Signup from "./components/Signup";
import  { useState } from 'react';
import Login from "./components/Login";
function App() {
const[alert,setalert]=useState(null);

const applyalert=(message,type)=>{
  setalert({
    mes:message,
    type:type
  })
  setTimeout(() => {
    setalert(null);
  }, 2000);
} 
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar></Navbar>
    <Alert alert={alert}/>
      <Routes>
        <Route path="/" element={<Home applyalert={applyalert}/>}></Route>
        <Route exact path="/about" element={<About />}> </Route>
        <Route exact path="/login" element={<Login applyalert={applyalert} />}> </Route>
        <Route exact path="/signup" element={<Signup applyalert={applyalert} />}> </Route>
      </Routes>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;