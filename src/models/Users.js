const { Model, DataTypes } = require('sequelize');

class Users extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        cpf: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize: connection,
        defaultScope: {
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt'],
          },
        },
        scopes: {
          withPassword: {
            attributes: {},
          },
        },
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Addresses, {
      foreignKey: 'user_id',
      as: 'addresses',
    });

    this.hasMany(models.PhoneNumbers, {
      foreignKey: 'user_id',
      as: 'phone_numbers',
    });

    this.belongsToMany(models.Roles, {
      foreignKey: 'user_id',
      through: 'user_roles',
      as: 'roles',
    });
  }
}

module.exports = Users;
