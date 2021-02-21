const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { SALT_ROUNDS, resMessages, tokenStorageTime } = require('../configs/constants');
const { JWT_SECRET } = require('../configs/config');
const NotFoundError = require('../errors/NotFoundError');
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
        throw new ConflictError(resMessages.userExist);
      }
      return bcrypt.hash(password, SALT_ROUNDS)
        .then((hash) => User.create({
          name,
          about,
          avatar,
          email,
          password: hash,
        }))
        .then(() => res.status(200).send({ message: resMessages.userCreated }))
        .catch(next);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: tokenStorageTime });
      res.send({ token });
    })
    .catch(next);
};

const getUserProfile = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError(resMessages.notFoundUser);
    }
    return res.status(200).send(user);
  })
  .catch(next);

const patchUserProfile = (req, res, next) => {
  const { name, email } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(resMessages.notFoundUser);
      }
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports = {
  getUserProfile,
  createUser,
  login,
  patchUserProfile,
};
