const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');

const { resMessages } = require('../configs/constants');

// get all movies
const getMovies = (req, res, next) => Movie.find({})
  .then((movies) => res.status(200).send(movies))
  .catch(next);

// add new movie
const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    movieId,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;

  return Movie.create({
    country,
    movieId,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => {
      if (!movie) {
        throw new BadRequestError(resMessages.badRequest);
      }
      return res.status(200).send(movie);
    })
    .catch(next);
};

// remove movie selected by id
const deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  return Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(resMessages.notFoundFilm);
      }
      if (JSON.stringify(owner) !== JSON.stringify(movie.owner)) {
        throw new ForbiddenError(resMessages.noRightsDeleteMovie);
      }
      return Movie.remove({ _id: movie._id })
        .then(() => res.status(200).send({ message: resMessages.movieRemoved }))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
