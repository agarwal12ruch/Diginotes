import React from 'react'
import Notes from './Notes'
import AddNote from './AddNote'
const Home = (props) => {
  const applyalert={props}
  
  return (
    <div>
     
    <div className="container my-3">
    <AddNote applyalert={applyalert}/>
    <Notes applyalert={applyalert}/>
    </div>
    </div>
  )
}

export default Home
