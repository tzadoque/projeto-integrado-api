const express = require('express');
const AddressController = require('../controllers/AddressController');

const addressRoutes = express.Router();

addressRoutes.get(
  '/users/:user_id/addresses',
  AddressController.findAllUserAddresses
);
addressRoutes.post('/users/:user_id/addresses', AddressController.create);

module.exports = addressRoutes;
