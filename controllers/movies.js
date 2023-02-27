const Movie = require('../models/movies');
const ValidationError = require('../errors/400-error');
const ForbiddenError = require('../errors/403-error');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  }).then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные при создании фильма'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.moviesId)
    .then((movie) => {
      if (movie) {
        const ownerId = movie.owner.toString();
        if (req.user._id === ownerId) {
          Movie.deleteOne(movie).then(() => { res.send(movie); }).catch(next);
        } else {
          throw new ForbiddenError('Невозможно удалить фильм');
        }
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Передан некорретный Id'));
      }
      return next(err);
    });
};
