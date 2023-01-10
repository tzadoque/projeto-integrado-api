const { Model, DataTypes } = require('sequelize');

class PhoneNumbers extends Model {
  static init(sequelize) {
    super.init(
      {
        number: DataTypes.STRING,
      },
      {
        sequelize,
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
