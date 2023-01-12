const Permissions = require('../models/Permissions');
const Roles = require('../models/Roles');

module.exports = {
  async findAllPermissions(req, res) {
    try {
      const permissions = await Permissions.findAll();

      return res.json(permissions);
    } catch (e) {
      return res.json(e.message);
    }
  },

  async findRolePermissions(req, res) {
    const { role_id } = req.params;

    try {
      const role = await Roles.findByPk(role_id, {
        include: { association: 'permissions', through: { attributes: [] } },
      });

      if (!role) {
        return res.status(400).json({ message: 'Role not found' });
      }

      return res.json(role.permissions);
    } catch (e) {
      return res.json(e.message);
    }
  },

  async create(req, res) {
    const { name, description } = req.body;

    if (!name) {
      return res.json({ message: `'name' is required` });
    }

    if (!description) {
      return res.json({ message: `'description' is required` });
    }

    try {
      const [permission, created] = await Permissions.findOrCreate({
        where: { name },
        defaults: {
          name,
          description,
        },
      });

      return created
        ? res.json({ message: `Permission '${name}' was created`, permission })
        : res.json({
            message: `Permission '${name}' already exists`,
            permission,
          });
    } catch (e) {
      return res.json(e.message);
    }
  },

  async assignPermissionToRole(req, res) {
    const { role_id } = req.params;
    const { permission_name } = req.body;

    if (!permission_name) {
      return res.json({ message: `'permission_name' is required` });
    }

    try {
      const role = await Roles.findByPk(role_id, {
        include: {
          association: 'permissions',
          through: { attributes: [] },
        },
      });

      if (!role) {
        return res.json({ message: 'Role not found' });
      }

      const permission = await Permissions.findOne({
        where: { name: permission_name },
      });

      if (!permission) {
        return res.json({ message: 'Permission not found' });
      }

      if (
        role.permissions.filter(
          (permission) => permission.name == permission_name
        ).length
      ) {
        return res.json({
          message: `Role ${role.name} already has permission '${permission.name}'`,
        });
      }

      await role.addPermission(permission);

      return res.json({
        message: `Permission '${permission.name}' assigned to role ${role.name}`,
      });
    } catch (e) {
      return res.json(e.message);
    }
  },

  async removePermissionForRole(req, res) {
    const { role_id } = req.params;
    const { permission_name } = req.body;

    if (!permission_name) {
      return res.json({ message: `'permission_name' is required` });
    }

    try {
      const role = await Roles.findByPk(role_id, {
        include: {
          association: 'permissions',
          through: { attributes: [] },
        },
      });

      if (!role) {
        return res.json({ message: 'Role not found' });
      }

      const permission = await Permissions.findOne({
        where: { name: permission_name },
      });

      if (!permission) {
        return res.json({ message: 'Permission not found' });
      }

      if (
        !role.permissions.filter(
          (permission) => permission.name == permission_name
        ).length
      ) {
        return res.json({
          message: `Role '${role.name}' does not have '${permission.name}' permission`,
        });
      }

      await role.removePermission(permission);

      return res.json({
        message: `'${permission.name}' permission removed from ${role.name} role`,
      });
    } catch (e) {
      return res.json(e.message);
    }
  },

  async update(req, res) {
    const { permission_id } = req.params;
    const { name, description } = req.body;

    const updatedFields = {
      name,
      description,
    };

    try {
      const permission = await Permissions.findByPk(permission_id);

      if (!permission) {
        return res.json({ message: `Permission not found` });
      }

      const permissions = await Permissions.findAll();

      const checkIfNameAlreadyExists = permissions.filter(
        (filteredPermission) => {
          return (
            filteredPermission.name == name &&
            filteredPermission.name != permission.name
          );
        }
      );

      if (checkIfNameAlreadyExists.length > 0) {
        return res.json({
          message: `Permission with name '${name}' already exists`,
        });
      }

      await Permissions.update(updatedFields, {
        where: {
          id: Number(permission_id),
        },
      });

      const updatedPermission = await Permissions.findByPk(permission_id);

      return res.json({
        message: `Permission updated successfully`,
        updatedPermission,
      });
    } catch (e) {
      return res.json(e.message);
    }
  },

  async delete(req, res) {
    const { permission_id } = req.params;

    try {
      const permission = await Permissions.findByPk(permission_id);

      if (!permission) {
        return res.json({ message: `Permission not found` });
      }

      await Permissions.destroy({
        where: {
          id: Number(permission_id),
        },
      });

      return res.json({
        message: `Permission '${permission.name}' has been successfully deleted`,
      });
    } catch (e) {
      return res.json(e.message);
    }
  },
};
