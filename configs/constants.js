const SALT_ROUNDS = 10;

const resMessages = {
  notFound: 'Запрашиваемый ресурс не найден',
  notFoundFilm: 'Нет фильма с таким id',
  notFoundUser: 'Нет пользователя с таким id',
  userExist: 'Пользователь с таким email уже существует',
  userCreated: 'Пользователь создан',
  noRightsDeleteMovie: 'Нет прав для удаления фильма',
  movieRemoved: 'Фильм удален',
  notAuthorized: 'Необходима авторизация',
  serverError: 'Ошибка на стороне сервера',
  badRequest: 'В запросе переданы некорректные данные',
};

const tokenStorageTime = '7d';

const serverErrStatus = 500;

const urlRegex = /https?:\/\/(w*\.)?[\d\w\-.[+()~:/\\?#\]@!$&'*,;=]{2,}#?/;

module.exports = {
  SALT_ROUNDS,
  resMessages,
  tokenStorageTime,
  serverErrStatus,
  urlRegex,
};
