const { Model, DataTypes } = require('sequelize');

class PhoneNumbers extends Model {
  static init(connection) {
    super.init(
      {
        number: DataTypes.STRING,
      },
      {
        sequelize,
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
      as: 'phone number owner',
    });
  }
}

module.exports = PhoneNumbers;
