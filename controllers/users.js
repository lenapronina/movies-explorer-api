const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { SALT_ROUNDS } = require('../configs/constants');
const { JWT_SECRET } = require('../configs/config');
const ConflictError = require('../errors/ConflictError');

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь с таким email уже существует');
      }
      return bcrypt.hash(password, SALT_ROUNDS)
        .then((hash) => User.create({
          name,
          about,
          avatar,
          email,
          password: hash,
        }))
        .then(() => res.status(200).send({ message: 'horray' }))
        .catch(next);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

// get authorized user
const getUserProfile = (req, res, next) => User.findById(req.user._id)
  .orFail(new Error('FindIdError'))
  .then((user) => res.status(200).send(user))
  .catch(next);

// update profile data
const patchUserProfile = (req, res, next) => {
  const { name, email } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  getUserProfile,
  createUser,
  login,
  patchUserProfile,
};
