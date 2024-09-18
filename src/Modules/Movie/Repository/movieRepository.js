const Movie = require('../Schema/movieSchema');

// Create a new movie
const createMovie = async (data) => {
  const movie = new Movie(data);
  return movie.save();
};

// Find a movie by title and director, case-insensitive and trimmed
const findMovieByTitleAndDirector = async (title, director) => {
  const formattedTitle = title.trim();    // Trim whitespace from title
  const formattedDirector = director.trim();  // Trim whitespace from director
  
  return Movie.findOne({
    $and: [
      { title: { $regex: new RegExp(`^${formattedTitle}$`, 'i') } },    // Case-insensitive exact match on title
      { director: { $regex: new RegExp(`^${formattedDirector}$`, 'i') } }  // Case-insensitive exact match on director
    ]
  });
};


// Find all movies
const findAllMovies = async () => {
    return Movie.find(); // This will retrieve all movies in the collection
  };

//   Find a movie by ID
const findMovieById = async (movieId) =>{
    return Movie.findById(movieId);
}

module.exports = {
  createMovie,
  findMovieByTitleAndDirector,
  findAllMovies, 
  findMovieById,
};
