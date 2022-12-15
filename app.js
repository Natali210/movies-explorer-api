require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const routes = require('./routes');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const { limiter } = require('./middlewares/rateLimiter');
const { MONGO_URL } = require('./utils/constants');

// Берем порт из переменных окружения
const { PORT = 3001 } = process.env;

mongoose.connect(MONGO_URL);

const app = express();

// Мидлвэр для cors
app.use(cors);

// Мидлвэр, чтобы распознавать json
app.use(express.json());

// Мидлвэр, чтобы извлекать данные из заголовка cookie
app.use(cookieParser());

// Логгер запросов
app.use(requestLogger);

// Защита от веб-уязвимостей с помощью helmet
app.use(helmet());

// Ограничение на количество запросов с одного IP
app.use(limiter);

app.use(routes);

// Логгер ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  // Отображаем в консоли, какой порт приложение слушает
  console.log(`Listening on port ${PORT}`);
});
