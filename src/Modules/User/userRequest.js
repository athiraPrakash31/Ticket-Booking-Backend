// modules/user/request/userRequest.js
const { body, validationResult } = require('express-validator');
const {errorMessages} = require('../User/userResources');


// Custom regex patterns
const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;  // Allows letters, numbers, underscores, 3-15 characters
const phoneNumberRegex = /^\d{10}$/;           // Allows only 10 digits
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;  // Minimum six characters, at least one letter and one number

const validateUserRegister = () => [
     // Username: Only letters, numbers, underscores, 3-15 characters
     body('username')
     .matches(usernameRegex)
     .withMessage(errorMessages.USERNAME_INVALID),
 
      // Email: Standard email validation using express-validator's `isEmail`
    body('email')
    .isEmail()
    .withMessage(errorMessages.EMAIL_INVALID),

// Phone number: 10 digits only
body('phoneNumber')
    .matches(phoneNumberRegex)
    .withMessage(errorMessages.PHONE_INVALID),

// Password: Minimum six characters, at least one letter and one number
body('password')
    .matches(passwordRegex)
    .withMessage(errorMessages.PASSWORD_INVALID)
];

const validateUserLogin =()=>[
    // Email: Standard email validation
    body('email')
        .isEmail()
        .withMessage(errorMessages.EMAIL_INVALID),  // Centralized error message

    // Password: Password must not be empty
    body('password')
        .notEmpty()
        .withMessage(errorMessages.PASSWORD_REQUIRED)  // Centralized error message
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validateUserRegister, validateUserLogin, validate };
