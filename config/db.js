// import mongoose
const mongoose = require('mongoose')

// Define connection string
const connectionString = process.env.DATABASE;

// connection code 
mongoose.connect(connectionString).then(()=>{
    console.log("Mongodb atlas connection established");
})
.catch((error)=>{
    console.log("Mongodb atlas connection error",error);
    
})