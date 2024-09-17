const Joi = require('joi');

// Movie request validation schema
const validateMovieRequest = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().messages({
      'string.empty': 'Title is required'
    }),
    releaseDate: Joi.date().required().messages({
      'date.base': 'Release date must be a valid date',
      'any.required': 'Release date is required'
    }),
    genre: Joi.string().required().messages({
      'string.empty': 'Genre is required'
    }),
    director: Joi.string().required().messages({
      'string.empty': 'Director is required'
    }),
    cast: Joi.array().items(Joi.string().required()).required().messages({
      'array.base': 'Cast must be an array of names',
      'any.required': 'Cast is required'
    }),
    duration: Joi.string().required().messages({
      'string.empty': 'Duration is required'
    }),
    rating: Joi.number().min(0).max(10).required().messages({
      'number.base': 'Rating must be a number',
      'number.min': 'Rating cannot be less than 0',
      'number.max': 'Rating cannot be more than 10',
      'any.required': 'Rating is required'
    }),
    synopsis: Joi.string().required().messages({
      'string.empty': 'Synopsis is required'
    }),
    language: Joi.string().required().messages({
      'string.empty': 'Language is required'
    })
  });

  return schema.validate(data);
};

module.exports = {
  validateMovieRequest
};
