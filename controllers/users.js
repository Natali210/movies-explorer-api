const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { MONGO_DB_CODE } = require('../utils/constants');
const RequestError = require('../errors/RequestError');
const RepeatingDataError = require('../errors/RepeatingDataError');
const NotFoundError = require('../errors/NotFoundError');

// Создание пользователя
const createNewUser = async (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // eslint-disable-next-line no-unused-vars
    const user = await User.create({
      email, password: hashedPassword, name, // хеш записан в базу
    });
    return res.status(201).send({
      data: {
        name, email,
      },
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new RequestError('Некорректные данные пользователя'));
    }
    if (err.code === MONGO_DB_CODE) {
      return next(new RepeatingDataError('Такой пользователь уже существует'));
    }
    return next(err);
  }
};

// Получение информации о текущем пользователе
const getСurrentUser = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user._id)
      .orFail(new NotFoundError('Пользователь c данным _id не найден'));
    return res.send(currentUser);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(new RequestError('Указан некорректный _id'));
    }
    return next(err);
  }
};

// Обновление информации о пользователе
const changeUserInfo = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    // eslint-disable-next-line max-len
    const changedProfile = await User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
      .orFail(new NotFoundError('Пользователь c данным _id не найден'));
    return res.send(changedProfile);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new RequestError('Некорректные данные для обновления профиля'));
    }
    if (err instanceof mongoose.Error.CastError) {
      return next(new RequestError('Указан некорректный _id'));
    }
    return next(err);
  }
};

module.exports = {
  createNewUser,
  getСurrentUser,
  changeUserInfo,
};
