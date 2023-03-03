const userRoutes = require('express').Router();

const { getUser, updateUser } = require('../controllers/users');
const { userId: getUserValidation, userUpdate: updateValidation } = require('../middlewares/validation');

userRoutes.get('/users/me', getUserValidation, getUser);

userRoutes.patch('/users/me', updateValidation, updateUser);

module.exports = userRoutes;
