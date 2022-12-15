const moviesRoutes = require('express').Router();
const { getMovies, postNewMovie, deleteMovie } = require('../controllers/movie');
const { movieIdValidation, movieValidation } = require('../middlewares/validation');

// Получение фильмов пользователя
moviesRoutes.get('/movies', getMovies);

// Cоздание нового фильма
moviesRoutes.post('/movies', movieValidation, postNewMovie);

// Удаление фильма по идентификатору
moviesRoutes.delete('/movies/:movieId', movieIdValidation, deleteMovie);

module.exports = moviesRoutes;
