const Roles = require('../models/Roles');
const Users = require('../models/Users');

module.exports = {
  async findAllRoles(req, res) {
    try {
      const roles = await Roles.findAll();

      return res.json(roles);
    } catch (e) {
      return res.json(e.message);
    }
  },

  async findUserRoles(req, res) {
    const { user_id } = req.params;

    try {
      const user = await Users.findByPk(user_id, {
        include: { association: 'roles', through: { attributes: [] } },
      });

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      return res.json(user.roles);
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
      const [role, created] = await Roles.findOrCreate({
        where: { name },
        defaults: {
          name,
          description,
        },
      });

      return created
        ? res.json({ message: `Role '${name}' was created`, role })
        : res.json({ message: `Role '${name}' already exists`, role });
    } catch (e) {
      return res.json(e.message);
    }
  },

  async assignRoleToUser(req, res) {
    const { user_id } = req.params;
    const { role_name } = req.body;

    try {
      const user = await Users.findByPk(user_id, {
        include: {
          association: 'roles',
          through: { attributes: [] },
        },
      });

      if (!user) {
        return res.json({ message: 'User not found' });
      }

      const role = await Roles.findOne({ where: { name: role_name } });

      if (!role) {
        return res.json({ message: 'Role not found' });
      }

      if (user.roles.filter((role) => role.name == role_name).length) {
        return res.json({
          message: `User ${user.name} already has role '${role.name}'`,
        });
      }

      await user.addRole(role);

      return res.json({
        message: `Role '${role.name}' assigned to user ${user.name}`,
      });
    } catch (e) {
      return res.json(e.message);
    }
  },

  async removeRoleForUser(req, res) {
    const { user_id } = req.params;
    const { role_name } = req.body;

    if (!role_name) return res.json({ message: `'role_name' is required` });

    try {
      const user = await Users.findByPk(user_id, {
        include: {
          association: 'roles',
          through: { attributes: [] },
        },
      });

      if (!user) {
        return res.json({ message: 'User not found' });
      }

      const role = await Roles.findOne({ where: { name: role_name } });

      if (!role) {
        return res.json({ message: 'Role not found' });
      }

      if (!user.roles.filter((role) => role.name == role_name).length) {
        return res.json({
          message: `User '${user.name}' does not have '${role.name}' role`,
        });
      }

      await user.removeRole(role);

      return res.json({
        message: `'${role.name}' role removed from ${user.name} user`,
      });
    } catch (e) {
      return res.json(e.message);
    }
  },

  async update(req, res) {
    const { role_id } = req.params;
    const { name, description } = req.body;

    const updatedFields = {
      name,
      description,
    };

    try {
      const role = await Roles.findByPk(role_id);

      if (!role) {
        return res.json({ message: `Role not found` });
      }

      const roles = await Roles.findAll();

      const checkIfNameAlreadyExists = roles.filter((filteredRole) => {
        return filteredRole.name == name && filteredRole.name != role.name;
      });

      if (checkIfNameAlreadyExists.length > 0) {
        return res.json({
          message: `Role with name '${name}' already exists`,
        });
      }

      await Roles.update(updatedFields, {
        where: {
          id: Number(role_id),
        },
      });

      const updatedRole = await Roles.findByPk(role_id);

      return res.json({ message: `Role updated successfully`, updatedRole });
    } catch (e) {
      return res.json(e.message);
    }
  },

  async delete(req, res) {
    const { role_id } = req.params;

    try {
      const role = await Roles.findByPk(role_id);

      if (!role) {
        return res.json({ message: `Role not found` });
      }

      await Roles.destroy({
        where: {
          id: Number(role_id),
        },
      });

      return res.json({
        message: `Role '${role.name}' has been successfully deleted`,
      });
    } catch (e) {
      return res.json(e.message);
    }
  },
};
