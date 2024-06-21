const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId, // to store a particular persons notes
    ref: "user"
  },
  title:{
    type:String,
    required:true
  },
  Description:{
    type:String,
    required:true
  },
  tag:{
    type:String,
    default:"General"
  },
  date:{
    type:Date,
    default:Date.now
  }
});
module.exports=mongoose.model('notes',NotesSchema)