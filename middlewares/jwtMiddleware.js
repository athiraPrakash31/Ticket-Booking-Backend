// import jwt token
const jwt = require('jsonwebtoken')

// token verification
const jwtMiddleware = (req,res,next)=>{
    console.log("Inside jwt middleware");
    
    try{

        // get the token
        const token = req.headers['authorization'].slice(7)
        console.log(token);
        // token verificatiion
        const jwtVerification = jwt.verify(token,process.env.JWT_SECRET)
        console.log(jwtVerification,'verify');
        req.payload = jwtVerification.userId
        console.log(req.payload);
        next()    
    }
    catch(error){
        res.status(401).json({"AuthorizationError":error.message})
    }
}

module.exports = jwtMiddleware