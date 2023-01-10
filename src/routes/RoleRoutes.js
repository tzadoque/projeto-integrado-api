const express = require('express');
const RoleController = require('../controllers/RoleController');

const roleRoutes = express.Router();

roleRoutes.get('/roles', RoleController.findAllRoles);
roleRoutes.get('/users/:user_id/roles', RoleController.findUserRoles);

roleRoutes.post('/roles', RoleController.create);
roleRoutes.post('/users/:user_id/roles', RoleController.assignRoleToUser);

roleRoutes.delete('/roles/:role_id', RoleController.delete);
roleRoutes.delete('/users/:user_id/roles', RoleController.removeRoleForUser);

module.exports = roleRoutes;
