const { Model, DataTypes } = require('sequelize');

class User extends Model {
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
            exclude: ['password'],
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
    this.hasMany(models.Address, {
      foreignKey: 'user_id',
      as: 'addresses',
    });
  }
}

module.exports = User;
