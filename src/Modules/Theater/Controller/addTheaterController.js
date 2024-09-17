const theaterRepository = require('../Repository/theaterRepository');
const userRepository = require('../../User/userRepository');
const { successResponse, errorResponse } = require('../Resources/theaterResources'); // Update the path if necessary

const addTheater = async (req, res) => {
    console.log('inside');
    
    const userId = req.payload; // Ensure user ID is correctly set in payload
    console.log(userId);
    
    const { name, location, capacity, contactNumber } = req.body;

    try {
        const existingTheater = await theaterRepository.findTheaterByNameOrContact(name, contactNumber);
        if (existingTheater) {
            return res.status(400).json(errorResponse(400, 'Theater with this name or contact number already exists'));
        }

        const user = await userRepository.findUserById(userId);
        
        if (!user) {
            return res.status(404).json(errorResponse(404, 'User not found'));
        }
        
        if (user.role === 'admin') {
            const newTheater = await theaterRepository.createTheater({ name, location, capacity, contactNumber });
            return res.status(201).json(successResponse(newTheater));
        } else {
            return res.status(403).json(errorResponse(403, 'Forbidden: Only admins can add theaters'));
        }
    } catch (error) {
        console.error('Error adding theater:', error);
        return res.status(500).json(errorResponse(500, 'Internal Server Error'));
    }
};

const getAllTheaters = async (req, res) => {
    try {
        const theaters = await theaterRepository.findAllTheaters();
        return res.status(200).json(successResponse(theaters));
    } catch (error) {
        console.error('Error retrieving theaters:', error);
        return res.status(500).json(errorResponse(500, 'Internal Server Error'));
    }
};

// /delete theater
const deleteTheater = async (req, res) => {
    const userId =req.payload;
    const { theaterId } = req.params;

    try {
        const theater = await theaterRepository.softDeleteTheater(theaterId);
        if (!theater) {
            return res.status(404).json(errorResponse(404, 'Theater not found'));
        }
        return res.status(200).json(successResponse(theater));
    } catch (error) {
        console.error('Error deleting theater:', error);
        return res.status(500).json(errorResponse(500, 'Internal Server Error'));
    }
};

module.exports = {
    addTheater,
    getAllTheaters,
    deleteTheater

};
