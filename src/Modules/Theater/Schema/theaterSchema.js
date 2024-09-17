const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    capacity: { 
        type: Number, 
        required: true 
    },
    contactNumber: { 
        type: String, 
        required: true, 
        unique: true 
    },
    deletedAt: { // This field will store the timestamp of deletion
        type: Date,
        default: null
    },
    isDeleted: { // a flag to easily identify deleted theaters
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Theater', theaterSchema);
