const appRouter = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser } = require('../controllers/users.js');
const auth = require('../middlewares/auth');
const { createUserValidation, loginValidation } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');
const { resMessages } = require('../configs/constants');

appRouter.post('/signup', createUserValidation, createUser);

appRouter.post('/signin', loginValidation, login);

appRouter.use(auth);

appRouter.use('/users', usersRouter);

appRouter.use('/movies', moviesRouter);

appRouter.use('/*', () => {
  throw new NotFoundError(resMessages.notFound);
});

module.exports = appRouter;
