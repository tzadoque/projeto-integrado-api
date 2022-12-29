const express = require('express');
const UserController = require('../controllers/UserController');

const userRoutes = express.Router();

userRoutes.post('/', UserController.create);

userRoutes.get('/', UserController.findAll);
userRoutes.get('/id/:id', UserController.findById);
userRoutes.get('/cpf/:cpf', UserController.findByCpf);

userRoutes.put('/id/:id', UserController.update);

userRoutes.delete('/:id', UserController.delete);

module.exports = userRoutes;
