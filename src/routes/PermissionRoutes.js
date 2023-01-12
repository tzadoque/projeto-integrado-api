const express = require('express');
const PermissionController = require('../controllers/PermissionController');

const permissionRoutes = express.Router();

permissionRoutes.get('/permissions', PermissionController.findAllPermissions);
permissionRoutes.get(
  '/roles/:role_id/permissions',
  PermissionController.findRolePermissions
);

permissionRoutes.post('/permissions', PermissionController.create);
permissionRoutes.post(
  '/roles/:role_id/permissions',
  PermissionController.assignPermissionToRole
);

permissionRoutes.put(
  '/permissions/:permission_id',
  PermissionController.update
);

permissionRoutes.delete(
  '/roles/:role_id/permissions',
  PermissionController.removePermissionForRole
);
permissionRoutes.delete(
  '/permissions/:permission_id',
  PermissionController.delete
);

module.exports = permissionRoutes;
