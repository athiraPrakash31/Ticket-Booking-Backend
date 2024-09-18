const movieRepository = require("../Repository/movieRepository");
const userRepository = require("../../User/userRepository");
const { errorResponse, successResponse } = require("../Resources/movieResources");
const { validateMovieRequest } = require("../Request/movieRequest");

// Add a new movie
const addMovie = async (req, res) => {
  const userId = req.payload; // Ensure user ID is correctly set in payload

  const {
    title,
    releaseDate,
    genre,
    director,
    cast,
    duration,
    rating,
    synopsis,
    language,
  } = req.body;

  // Validate request
  const { error } = validateMovieRequest(req.body);
  if (error) {
    return res.status(400).json(errorResponse(400, error.details[0].message));
  }

  try {
    // Check if the movie already exists
    const existingMovie = await movieRepository.findMovieByTitleAndDirector(title, director);
    if (existingMovie) {
      return res.status(400).json(errorResponse(400, "Movie with this title or director already exists"));
    }

    // Find the user and check if they exist
    const user = await userRepository.findUserById(userId);
    if (!user) {
      return res.status(404).json(errorResponse(404, "User not found"));
    }

    // Check if the user is an admin
    if (user.role !== "admin") {
      return res.status(403).json(errorResponse(403, "Unauthorized action"));
    }

    // Ensure poster image is uploaded
    const posterImage = req.file?.filename;
    if (!posterImage) {
      return res.status(400).json(errorResponse(400, "Poster image is required."));
    }

    
    // Create a new movie entry
    const movie = await movieRepository.createMovie({
      title,
      releaseDate,
      genre,
      director,
      cast,
      duration,
      rating,
      synopsis,
      language,
      posterImage,
    });

    res.status(201).json(successResponse(  movie,{message:"Movie added successfully"} ));
  } catch (error) {
    res.status(500).json(errorResponse(500, error.message));
  }
};


// get all movies
const getAllMovies = async (req, res) => {
    try {
      const movies = await movieRepository.findAllMovies();
      
      if (movies.length === 0) {
        return res.status(404).json(errorResponse(404, "No movies found"));
      }
  
      res.status(200).json(successResponse( movies,{message:"Movie fetches successfully"} ));
    } catch (error) {
      res.status(500).json(errorResponse(500, error.message));
    }
  };


  // Fetch a movie by ID
const getMovieById = async (req, res) => {
    const { movieId } = req.params;
  
    try {
      // Find movie by ID
      const movie = await movieRepository.findMovieById(movieId);
      
      if (!movie) {
        return res.status(404).json(errorResponse(404, "Movie not found"));
      }
  
      res.status(200).json(successResponse( movie,{message:"Movie fetched successfully"} ));
    } catch (error) {
      res.status(500).json(errorResponse(500, error.message));
    }
  };
module.exports = {
  addMovie,
  getAllMovies,
  getMovieById
};
