const express = require('express');

// middlewares
const authMiddleware = require('../middlewares/auth.js');

// routes
const authRoutes = require('./AuthRoutes');
const userRoutes = require('./UserRoutes');
const addressRoutes = require('./AddressRoutes');
const roleRoutes = require('./RoleRoutes');
const permissionRoutes = require('./PermissionRoutes');
const phoneNumberRoutes = require('./PhoneNumberRoutes.js');

const routes = express.Router();

routes.get('/', authMiddleware, (req, res) => {
  return res.json({ message: 'API do Projeto Integrado' });
});

routes.use('/', userRoutes);
routes.use('/', authRoutes);
routes.use('/', addressRoutes);
routes.use('/', roleRoutes);
routes.use('/', permissionRoutes);
routes.use('/', phoneNumberRoutes);

module.exports = routes;
