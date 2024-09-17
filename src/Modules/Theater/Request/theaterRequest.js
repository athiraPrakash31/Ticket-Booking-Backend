const { body, validationResult } = require('express-validator');

const validateTheater = () => {
    return [
        body('name').notEmpty().withMessage('Name is required'),
        body('location').notEmpty().withMessage('Location is required'),
        body('capacity').isNumeric().withMessage('Capacity must be a number'),
        body('contactNumber').notEmpty().withMessage('Contact Number is required')
    ];
};

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    console.log('err');
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateTheater,
    handleValidationErrors
};
