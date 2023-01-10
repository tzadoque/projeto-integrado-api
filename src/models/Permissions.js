const { Model, DataTypes } = require('sequelize');

class Permissions extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
      },
      {
        sequelize,
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
