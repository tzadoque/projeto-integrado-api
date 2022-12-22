const express = require('express');
const UserController = require('../controllers/UserController');

const userRoutes = express.Router();

userRoutes.get('/', UserController.findAll);
userRoutes.get('/:id', UserController.findById);

userRoutes.post('/', UserController.create);
userRoutes.put('/:id', UserController.update);
userRoutes.delete('/:id', UserController.delete);

module.exports = userRoutes;
