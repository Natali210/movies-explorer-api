const mongoose = require('mongoose');
const Movie = require('../models/movie');
const RequestError = require('../errors/RequestError');
const NotFoundError = require('../errors/NotFoundError');
const NoRightsError = require('../errors/NoRightsError');
const { INCORRECT_MOVIE_DATA, NOT_FOUND_MOVIE, NOT_AUTHOR } = require('../utils/constants');

// Получение всех сохранённых текущим пользователем фильмов
const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

// Создание нового фильма
const postNewMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const movie = await Movie.create({
      owner: req.user._id,
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    });
    return res.send(movie);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new RequestError(INCORRECT_MOVIE_DATA));
    }
    return next(err);
  }
};

// Удаление фильма по id
const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId)
      .orFail(new NotFoundError(NOT_FOUND_MOVIE));
    if (movie.owner.toString() !== req.user._id) {
      return next(new NoRightsError(NOT_AUTHOR));
    }
    const movieToDelete = await Movie.findByIdAndRemove(req.params.movieId);
    return res.send(movieToDelete);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new RequestError(INCORRECT_MOVIE_DATA));
    }
    return next(err);
  }
};

module.exports = {
  getMovies,
  postNewMovie,
  deleteMovie,
};
