const MONGO_DB_CODE = 11000;
const MONGO_URL = 'mongodb://localhost:27017/moviesdb';
const regex = /https?:\/\/(www\.)?[-a-z0-9A-Z:%._~#=]{1,150}\.[a-z0-9A-Z()]{1,10}\b([-a-z0-9A-Z()@:%_.~#?&//=]*)/;

const INCORRECT_AUTH_DATA = 'Некорректный email или пароль';
const SUCCESSFUL_LOGIN = 'Успешная авторизация';
const SUCCESSFUL_LOGOUT = 'Успешный выход';
const INCORRECT_MOVIE_DATA = 'Некорректные данные фильма';
const NOT_FOUND_MOVIE = 'Фильм c данным _id не найден';
const NOT_AUTHOR = 'Фильм принадлежит другому пользователю';
const INCORRECT_USER_DATA = 'Некорректные данные пользователя';
const USER_ALREADY_EXIST = 'Такой пользователь уже существует';
const NOT_FOUND_USER = 'Пользователь c данным _id не найден';
const NOT_AUTHORIZED = 'Необходима авторизация';
const NOT_FOUND_PAGE = 'Страница не найдена';

module.exports = {
  MONGO_DB_CODE,
  MONGO_URL,
  regex,
  INCORRECT_AUTH_DATA,
  SUCCESSFUL_LOGIN,
  SUCCESSFUL_LOGOUT,
  INCORRECT_MOVIE_DATA,
  NOT_FOUND_MOVIE,
  NOT_AUTHOR,
  INCORRECT_USER_DATA,
  USER_ALREADY_EXIST,
  NOT_FOUND_USER,
  NOT_AUTHORIZED,
  NOT_FOUND_PAGE,
};
