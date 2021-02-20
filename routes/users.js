const userRouter = require('express').Router();
const { getUserProfileValidation, patchUserProfileValidation } = require('../middlewares/validation');

const {
  getUserProfile,
  patchUserProfile,
} = require('../controllers/users.js');

userRouter.get('/me', getUserProfileValidation, getUserProfile);

userRouter.patch('/me', patchUserProfileValidation, patchUserProfile);

module.exports = userRouter;
