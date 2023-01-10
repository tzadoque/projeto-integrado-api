const { Model, DataTypes } = require('sequelize');

class Roles extends Model {
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
    this.belongsToMany(models.Users, {
      foreignKey: 'role_id',
      through: 'user_roles',
      as: 'users',
    });

    this.belongsToMany(models.Permissions, {
      foreignKey: 'role_id',
      through: 'role_permissions',
      as: 'permissions',
    });
  }
}

module.exports = Roles;
