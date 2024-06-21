import * as React from "react";
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About"
import Home from "./components/Home";
import Alert from "./components/Alert";
import NoteState from "./context/notes/NoteState"
import Signup from "./components/Signup";
import Login from "./components/Login";
function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar></Navbar>
    <Alert message="This is react alert"> </Alert>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route exact path="/about" element={<About />}> </Route>
        <Route exact path="/login" element={<Login />}> </Route>
        <Route exact path="/signup" element={<Signup />}> </Route>
      </Routes>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;