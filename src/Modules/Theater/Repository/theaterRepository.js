const Theater = require('../Schema/theaterSchema');

const createTheater = async (theaterData) => {
    const theater = new Theater(theaterData);
    return await theater.save();
};

const findTheaterByNameOrContact = async (name, contactNumber) => {
    return await Theater.findOne({ $or: [{ name }, { contactNumber }],
    //soft delete 
    deletedAt:null
    });
};

// get all theaters
const findAllTheaters = async () => {
    return await Theater.find({deletedAt:null}); // Fetch only non-deleted theaters
};


// soft delete
const softDeleteTheater = async (theaterId) => {
    return await Theater.findByIdAndUpdate(theaterId, 
        { 
        deletedAt: new Date(),//mark as delete time
        isDeleted:true // mark as delete
         }, 
        { new: true });
};

module.exports = {
    createTheater,
    findTheaterByNameOrContact,
    findAllTheaters,
    softDeleteTheater

};
