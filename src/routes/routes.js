const express = require('express');
const authRoutes = require('./AuthRoutes');
const userRoutes = require('./UserRoutes');
const authMiddleware = require('../middlewares/auth.js');
const addressRoutes = require('./AddressRoutes');

const routes = express.Router();

routes.get('/', authMiddleware, (req, res) => {
  return res.json({ message: 'API do Projeto Integrado' });
});

routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);
routes.use('/', addressRoutes);

module.exports = routes;
