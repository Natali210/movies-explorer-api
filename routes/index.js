const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { createNewUser } = require('../controllers/users');
const { login, logout } = require('../controllers/login');
const { auth } = require('../middlewares/auth');
const { newUserValidation, loginValidation } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');

// Роуты, которым авторизация не нужна
router.post('/signin', loginValidation, login);
router.post('/signup', newUserValidation, createNewUser);

// Авторизация для всех других страниц приложения
router.use(auth);

// Выход
router.post('/signout', logout);

// Применяем маршруты как мидлвэры
router.use(userRoutes);
router.use(movieRoutes);

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
