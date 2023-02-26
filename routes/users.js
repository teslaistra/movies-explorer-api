const userRoutes = require('express').Router();

const { getUser, updateUser } = require('../controllers/users');

userRoutes.get('/users/me', getUser);

userRoutes.patch('/users/me', updateUser);

module.exports = userRoutes;
