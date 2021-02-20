const { celebrate, Joi } = require('celebrate');

module.exports.getUserProfileValidation = celebrate({
  headers: Joi.object().keys({}).unknown(true),
});

module.exports.patchUserProfileValidation = celebrate({
  headers: Joi.object().keys({}).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.getMoviesValidation = celebrate({
  headers: Joi.object().keys({}).unknown(true),
});

module.exports.createMovieValidation = celebrate({
  headers: Joi.object().keys({}).unknown(true),
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    movieId: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    image: Joi.string().required().regex(/https?:\/\/(w*\.)?[\d\w\-.[+()~:/\\?#\]@!$&'*,;=]{2,}#?/),
    trailer: Joi.string().required().regex(/https?:\/\/(w*\.)?[\d\w\-.[+()~:/\\?#\]@!$&'*,;=]{2,}#?/),
    thumbnail: Joi.string().required().regex(/https?:\/\/(w*\.)?[\d\w\-.[+()~:/\\?#\]@!$&'*,;=]{2,}#?/),
  }),
});

module.exports.deleteMovieValidation = celebrate({
  headers: Joi.object().keys({}).unknown(true),
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }),
});

module.exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
