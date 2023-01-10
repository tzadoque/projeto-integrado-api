const Sequelize = require('sequelize');
const dbConfig = require('../config/database.json');

const User = require('../models/Users');
const Address = require('../models/Addresses');
const Roles = require('../models/Roles');
const Permission = require('../models/Permissions');

const connection = new Sequelize(dbConfig);

User.init(connection);
Address.init(connection);
Roles.init(connection);
Permission.init(connection);

User.associate(connection.models);
Address.associate(connection.models);
Roles.associate(connection.models);
Permission.associate(connection.models);

module.exports = connection;
