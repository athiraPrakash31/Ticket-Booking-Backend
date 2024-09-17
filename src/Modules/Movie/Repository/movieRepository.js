const Movie = require('../Schema/movieSchema');

// Create a new movie
const createMovie = async (data) => {
  const movie = new Movie(data);
  return movie.save();
};

// Find a movie by title or director
const findMovieByTitleOrDirector = async (title, director) => {
  return Movie.findOne({
    $or: [{ title }, { director }]
  });
};

// Find all movies
const findAllMovies = async () => {
    return Movie.find(); // This will retrieve all movies in the collection
  };

module.exports = {
  createMovie,
  findMovieByTitleOrDirector,
  findAllMovies, 
};
