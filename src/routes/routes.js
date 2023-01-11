const express = require('express');

// middlewares
const authMiddleware = require('../middlewares/auth.js');

// routes
const authRoutes = require('./AuthRoutes');
const userRoutes = require('./UserRoutes');
const addressRoutes = require('./AddressRoutes');
const roleRoutes = require('./RoleRoutes');

const routes = express.Router();

routes.get('/', authMiddleware, (req, res) => {
  return res.json({ message: 'API do Projeto Integrado' });
});

routes.use('/', userRoutes);
routes.use('/auth', authRoutes);
routes.use('/', addressRoutes);
routes.use('/', roleRoutes);

module.exports = routes;
