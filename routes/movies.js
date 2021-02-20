const movieRouter = require('express').Router();

const {
  getMoviesValidation,
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/validation');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies.js');

movieRouter.get('/', getMoviesValidation, getMovies);

movieRouter.post('/', createMovieValidation, createMovie);

movieRouter.delete('/:_id', deleteMovieValidation, deleteMovie);

module.exports = movieRouter;
