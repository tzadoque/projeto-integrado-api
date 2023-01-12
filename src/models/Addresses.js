const { Model, DataTypes } = require('sequelize');

class Addresses extends Model {
  static init(connection) {
    super.init(
      {
        zipcode: DataTypes.STRING,
        street: DataTypes.STRING,
        number: DataTypes.INTEGER,
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
    this.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'address owner',
    });
  }
}

module.exports = Addresses;
