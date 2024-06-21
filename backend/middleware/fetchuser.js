var jwt = require('jsonwebtoken');
const JWT_SECRET="uncanny_counter";
const fetchuser=(req,res,next)=>{
    // to get user from jwt token and add id to requested object
    const token=req.header('auth-token'); //auth-token is the name of the header
    if(!token){
        res.status(401).send("pls authenticate using a vaild token")    
    }
    // if token exists it may be valid or not valid
    try {
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user; // we will get our user
    next();
    } catch (error) {
        console.log(error)
        res.status(401).send("pls authenticate using a vaild token")    
    }
    
}
module.exports=fetchuser;