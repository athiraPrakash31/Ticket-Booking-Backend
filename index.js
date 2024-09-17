require('dotenv').config()

// 2. import express
const express = require('express')

// 3. import cors
const cors = require('cors');

// 4. import DB
const DB = require('./config/db');


// 5. import the seeder function
const { seedAdmin } = require('./src/Modules/Admin/adminController')

const router = require('./src/routes/router')
const BookingServer = express();

BookingServer.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

BookingServer.use(express.json());

BookingServer.use(router);
BookingServer.use('/uploads',express.static('./uploads'))


// call the seeder function
const seedDatabase = async () =>{
    try {
        await seedAdmin(); // Seed admin user
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

// seed the database before starting the server
seedDatabase().then(()=>{
        const PORT = 4000 || process.env.PORT

        BookingServer.listen(PORT,()=>{
            console.log('BookingServer listening on port '+PORT);
        })
        
        BookingServer.get('/',(req,res)=>{
            res.send('Hello world!');
        })
})
// Error Handling Middleware
BookingServer.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

