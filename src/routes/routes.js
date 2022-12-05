const express = require('express');
const userRoutes = require('./UserRoutes');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'API do Projeto Integrado' });
});

routes.use('/users', userRoutes);

module.exports = routes;
