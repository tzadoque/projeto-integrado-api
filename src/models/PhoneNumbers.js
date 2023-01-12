const { Model, DataTypes } = require('sequelize');

class PhoneNumbers extends Model {
  static init(connection) {
    super.init(
      {
        number: DataTypes.STRING,
      },
      {
        sequelize: connection,
        tableName: 'phone_numbers',
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
      as: 'owner',
    });
  }
}

module.exports = PhoneNumbers;
