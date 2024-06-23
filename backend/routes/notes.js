const express = require("express")
const router = express.Router()
const Note = require("../models/Note")
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser")
// it fetches all notes of u ser 

// Route 1: get all the notes . /api/notes/fetchnotes
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id })
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("some error occured");
  }

})

// Route 2: To add a new note from the user // login required.  /api/notes/addnote
router.post("/addnote", fetchuser, [
  body("title", "enter a title of length min 5").isLength({ min: 3 }),
  body('Description', "enter a description of length min 5").isLength({ min: 5 }),
], async (req, res) => {

  try {
    const { title, Description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
      title, Description, tag, user: req.user.id
      //This assigns the id property of the req.user object to the user property of the new Note instance.
      // req.user.id is typically used in the context of an authenticated user in a web application,
    })
    const savenote = await note.save();
    res.json(savenote)
  } catch (error) {
    console.log(error);
    res.status(500).send("some error occured");
  }
  // creating a new note


})

// Route 3: update an existing  note from the user // login required.  /api/notes/updatenote/:id
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, Description, tag } = req.body;
    const newnote = {}
    // take the input of the things to be updated
    if (title) { newnote.title = title };
    if (Description) { newnote.Description = Description };
    if (tag) { newnote.tag = tag };
    // before this we have to verify that the person upadating the note is the person who had written it.

    // update them
    let note = await Note.findById(req.params.id) //id given in the params i.e /api/notes/updatenote/id
    if (!note) {
      res.status(404).send("Not found")
    }
    if (note.user.toString() !== req.user.id) {  // .toString will give the id of the note and we will compare it with the user id
      return res.status(401).send("not allowed")
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true }) // this line will update our note
    res.json({ note })
  } catch (error) {
    console.log(error);
    res.status(500).send("some error occured");
  }


})

// Route 3: Delete an existing  note from the user // login required.  /api/notes/deletenote/:id;
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, Description, tag } = req.body;
    // find the note and delete them
    let note = await Note.findById(req.params.id) //id given in the params i.e /api/notes/updatenote/id
    if (!note) {
      res.status(404).send("Not found")
    }
    if (note.user.toString() !== req.user.id) {  // .toString will give the id of the note and we will compare it with the user id
      return res.status(401).send("not allowed")
    }
    note = await Note.findByIdAndDelete(req.params.id) // this line will update our note
    res.send("note has been deleted")
  } catch (error) {
    console.log(error);
    res.status(500).send("some error occured");
  }
 
})
module.exports = router