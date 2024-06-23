const express=require("express")
const router=express.Router()
const User=require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcryptjs")
var jwt = require('jsonwebtoken');

var fetchuser=require("../middleware/fetchuser")

const JWT_SECRET="uncanny_counter";
// ROUTE 1: create a user using postman : no login required 
// "/api/auth/createuser"
router.post("/createuser",[
    body("name","enetr a valid name").isLength({min:3}),
    body("email","enter a valid email").isEmail(),
    body('password',"Password must be of 5 charactors").isLength({ min: 5 }),
],async(req, res) => {
       let success=false;
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
          return res.status(400).json({ success,errors: errors.array() });
         }
      // check whether user with same email exits
      try{
      let user=await User.findOne({email:req.body.email})
      if(user){
        return res.status(400).json({success,error:"user with this email alredy exists"})
      }
      // to generate a salt
      const salt=await bcrypt.genSalt(10);
      //password ecryption
      const seqp= await bcrypt.hash(req.body.password,salt)
      // create a new user
      user =await User.create({
        name: req.body.name,
        email:req.body.email,
        password:seqp ,
      })
      const data={
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success,"auth-token":authtoken})
    }
    catch(err){
      console.log(err.message);
      res.status(500).send("some error occured");
    }
      // .then(user => res.json(user))
      // .catch(err=> console.log(err))
}) 


// ROUTE 2: create a login route at "/api/auth/login"
router.post("/login",[
  body("email","enter a valid email").isEmail(),  // check user throgh email and password
  body('password',"enter password").exists(),
],async(req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
       }
    const {email,password}=req.body;
    try{
      let user= await User.findOne({email})
      let success=false;
      if(!user){
        success=false;
        return res.status(400).send({error:"Please login with valid credentials"})
      }
      const passwordCompare= await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        success=false;
        return res.json({success,error:"Please login with valid credentials"})
      }
      const data={
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success,"auth-token":authtoken})
      }
    catch(error){
      res.status(500).send("Internal server error")
    }
})

// ROUTE : 3 fetch user details by POST: /api/auth/getuser

router.post("/getuser",fetchuser,async(req, res) => {
try{
    const userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    res.send(user);
}
catch(error){
  res.status(500).send("Internal server error")
}
})
module.exports=router








// console.log(req.body)
//     const user=User(req.body)
//     user.save()
//res.send(req.body) // to view in postman