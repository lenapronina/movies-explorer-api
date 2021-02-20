const { isCelebrateError } = require('celebrate');

// eslint-disable-next-line no-unused-vars
function allErrorHandler(err, req, res, next) {
  const { statusCode = 500, message = 'Ошибка на стороне сервера' } = err;

  if (err.name === 'ValidationError' || isCelebrateError(err)) {
    return res.status(400).send({
      message: 'В запросе переданы некорректные данные',
    });
  }
  return res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
}

module.exports = { allErrorHandler };
