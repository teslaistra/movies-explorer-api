const movieRoutes = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovie: createMovieValidation, deleteMovie: deleteMovieValidation, userId: userIdValidation } = require('../middlewares/validation');

movieRoutes.post('/movies', createMovieValidation, createMovie);

movieRoutes.delete('/movies/:moviesId', deleteMovieValidation, deleteMovie);

movieRoutes.get('/movies', userIdValidation, getMovies);

module.exports = movieRoutes;
