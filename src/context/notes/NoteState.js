import NoteContext from "./NoteContext"
import { useState } from "react"
const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesstart = []      // array of notes
  const [notes, setnotes] = useState(notesstart)

  //GET all notes
  const getNote = async () => {  // notes will be fetched from the api call
    // API CALL
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    });
    const json = await response.json();
    // g(jsonconsole.lo);
    setnotes(json)

  }

//add a note 
// *****************************************************************
const addNote = async (title, Description, tag) => {  // notes will be fetched from the api call
    // API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, Description, tag }),
    });
    //   const json= response.json(); 

    console.log("adding a new note")
    const note = {
      "user": "6669a40e0b8d485ba4e57ff2",  //manual method
      "title": title,
      "Description": Description,
      "tag": tag,
      "_id": "666fd459b778bd736c95bba9",
      "date": "2024-06-17T06:14:49.317Z",
      "__v": 0
    };
    setnotes(notes.concat(note)) // to add notes 
  }


  // delete a note
// *****************************************************************
  //api fetch 
    const deletenote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }, 
    });
    const json = response.json();
    //console.log(json)
    //deletion
    const newNotes = notes.filter(note => note._id !== id);
    setnotes(newNotes);
  }

  
  //edit a note
// *****************************************************************
  const editnote = async (id, title, Description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, Description, tag }),
    });
    const json = response.json();
    
    
    //Logic to edit a note
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.Description = Description;
        element.tag = tag;
      }

    }
  }
// *****************************************************************
  return (
    <NoteContext.Provider value={{ notes, addNote, deletenote,  getNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;


// const s1={
//         "name":"ruchita",
//         "age":"20"
// }
// const [state,setState]=useState(s1);
// const update=()=>{
//         setTimeout(() => {
//                 setState({
//                         "name":"sanchi",
//                         "age":"18"   
//                 })      
//         }, 1000);
       
// }


