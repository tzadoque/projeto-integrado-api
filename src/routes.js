const express = require('express');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'API do Projeto Integrado' });
});

routes.get('/users', UserController.findAll);
routes.get('/users/:id', UserController.findById);

routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

module.exports = routes;
