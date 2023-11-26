const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { allowedUrl } = require('../utils/isLink');
const {
  getUsers,
  getUserById,
  updateAvatar,
  updateProfile,
  getMe,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getMe);
userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(allowedUrl).required(),
  }),
}), updateAvatar);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);

module.exports = userRouter;
