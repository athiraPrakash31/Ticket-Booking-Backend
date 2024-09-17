const mongoose = require("mongoose");

// Movie schema definition
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  cast: { type: [String], required: true },
  duration: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
  synopsis: { type: String, required: true },
  language: { type: String, required: true },
  posterImage: { type: String, required: true }, // Filename for uploaded poster
});

module.exports = mongoose.model("Movie", movieSchema);
