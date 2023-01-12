const { Model, DataTypes } = require('sequelize');

class Permissions extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
      },
      {
        sequelize: connection,
        defaultScope: {
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Roles, {
      foreignKey: 'permission_id',
      through: 'role_permissions',
      as: 'roles',
    });
  }
}

module.exports = Permissions;
