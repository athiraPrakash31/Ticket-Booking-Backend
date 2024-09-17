const express = require('express');
const userController = require('../Modules/User/userController');
const movieController = require('../Modules/Movie/Controller/movieController');
const theaterController = require('../Modules/Theater/Controller/addTheaterController')
const router = express.Router();
const multerConfig = require('../utils/multerConfig')
const jwtMiddleware = require('../../middlewares/jwtMiddleware')
const { validateUserLogin, validate: validateUser, validateUserRegister } = require('../Modules/User/userRequest')
const theaterRequest = require('../Modules/Theater/Request/theaterRequest')

// User register route
router.post('/register', validateUserRegister(), validateUser, userController.register);

// User login route
router.post('/login', validateUserLogin(), validateUser, userController.login);

// Add movie
router.post('/admin/addMovie', multerConfig.single('posterImage'), jwtMiddleware, movieController.addMovie);

// get all theaters
router.get("/admin/getAllMovies", movieController.getAllMovies);

// Add theater
router.post('/admin/addTheaters', theaterRequest.validateTheater(), theaterRequest.handleValidationErrors,jwtMiddleware, theaterController.addTheater);

// get all theaters
router.get('/admin/getAllTheaters',theaterController.getAllTheaters);

// soft delete the theater from the theater list
router.delete('/admin/deleteTheater/:theaterId', jwtMiddleware, theaterController.deleteTheater);


module.exports = router;
