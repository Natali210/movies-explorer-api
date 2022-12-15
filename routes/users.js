const router = require('express').Router();
const { getСurrentUser, changeUserInfo } = require('../controllers/users');
const { profileValidation } = require('../middlewares/validation');

// Получение информации о пользователе
router.get('/users/me', getСurrentUser);

// Обновление профиля пользователя
router.patch('/users/me', profileValidation, changeUserInfo);

module.exports = router;
