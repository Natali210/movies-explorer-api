const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_JWT } = process.env;
const AuthorizationError = require('../errors/AuthorizationError');
const { NOT_AUTHORIZED } = require('../utils/constants');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  if (!token) {
    return next(new AuthorizationError(NOT_AUTHORIZED));
  }

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_JWT : 'dev-secret');
  } catch (err) {
    return next(new AuthorizationError(NOT_AUTHORIZED));
  }
  req.user = payload;
  return next();
};
