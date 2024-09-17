 const mongoose = require('mongoose');
 const bcrypt = require('bcrypt');

//  define the admin schema 
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin'
    }
});

// Hash the password before saving
adminSchema.pre('save', async function (next) {
    const admin = this;
    if (!admin.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
    next();
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;