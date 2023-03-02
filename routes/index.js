const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');
const Error404 = require('../errors/404-error');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { register: registerValidation, login: loginValidation } = require('../middlewares/validation');

router.post(
  '/signin',
  loginValidation,
  login,
);

router.post(
  '/signup',
  registerValidation,
  createUser,
);

router.use(auth);

router.use('/', userRouter);
router.use('/', movieRouter);

router.use('*', (req, res, next) => {
  next(new Error404('Страница не найдена'));
});

module.exports = router;
