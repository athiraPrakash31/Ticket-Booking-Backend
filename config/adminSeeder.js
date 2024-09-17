const  db = require('../config/db');
const { seedAdmin } = require('../src/Modules/Admin/adminController');

// Connect to the database and seed the admin user

const seed = async()=>{
    await db();
    await seedAdmin();
    process.exit();
};

seed();