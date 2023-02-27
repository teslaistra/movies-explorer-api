const movieRoutes = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

movieRoutes.post('/movies', createMovie);

movieRoutes.delete('/movies/:moviesId', deleteMovie);

movieRoutes.get('/movies', getMovies);

module.exports = movieRoutes;
