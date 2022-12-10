const mongoose = require('mongoose');
const Movie = require('../models/movie');
const RequestError = require('../errors/RequestError');
const NotFoundError = require('../errors/NotFoundError');
const NoRightsError = require('../errors/NoRightsError');

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
      return next(new RequestError('Некорректные данные фильма'));
    }
    return next(err);
  }
};

// Удаление фильма по id
const deleteMovie = async (req, res, next) => {
  try {
    // eslint-disable-next-line max-len
    const movie = await Movie.findById(req.params.movieId)
      .orFail(new NotFoundError('Фильм c данным _id не найдена'));
    if (movie.owner.toString() !== req.user._id) {
      return next(new NoRightsError('Фильм принадлежит другому пользователю'));
    }
    const movieToDelete = await Movie.findByIdAndRemove(req.params.movieId);
    return res.send(movieToDelete);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new RequestError('Некорректные данные фильма'));
    }
    return next(err);
  }
};

module.exports = {
  getMovies,
  postNewMovie,
  deleteMovie,
};
