const userRepository = require('../User/userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { errorMessages } = require('../User/userResources');

const register = async (req, res) => {
    try {
        const { username, email, phoneNumber, password, role } = req.body;

        const existingEmail = await userRepository.findByEmail(email);
        const existingUsername = await userRepository.findByUsername(username);

        if (existingEmail) {
            return res.status(400).json({ message: errorMessages.EMAIL_EXISTS });
        }

        if (existingUsername) {
            return res.status(400).json({ message: errorMessages.USERNAME_EXISTS });
        }

        // Default to 'user' role if not provided
        const userRole = role || 'user';

        const user = await userRepository.createUser({ username, email, phoneNumber, password, role: userRole });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await userRepository.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: errorMessages.EMAIL_NOT_FOUND });
        }

        // Compare the password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: errorMessages.PASSWORD_INCORRECT });
        }

        // Generate JWT token with role information
        const token = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET);

        res.status(200).json({ message: 'Login successful',user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    register,
    login
};
