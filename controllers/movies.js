const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');

// get all cards
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
    .then((movie) => res.status(200).send(movie))
    .catch(next);
};

// delete card selected by id
const deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  return Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      if (JSON.stringify(owner) !== JSON.stringify(movie.owner)) {
        throw new ForbiddenError('Нет прав для удаления карточки');
      }
      return Movie.remove(movie)
        .then(() => res.status(200).send({ message: 'Карточка удалена' }))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
