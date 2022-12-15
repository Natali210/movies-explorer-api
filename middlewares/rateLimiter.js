const rateLimit = require('express-rate-limit');

// 100 запросов с одного IP в 15 минут
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { limiter };
