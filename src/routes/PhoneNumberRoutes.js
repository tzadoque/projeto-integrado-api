const express = require('express');
const PhoneNumberController = require('../controllers/PhoneNumberController');

const phoneNumberRoutes = express.Router();

phoneNumberRoutes.get('/phones', PhoneNumberController.findAllPhoneNumbers);
phoneNumberRoutes.get(
  '/phones/:phone_id',
  PhoneNumberController.findPhoneNumberById
);
phoneNumberRoutes.get(
  '/users/:user_id/phones',
  PhoneNumberController.findAllUserPhoneNumbers
);

phoneNumberRoutes.post('/users/:user_id/phones', PhoneNumberController.create);

phoneNumberRoutes.put(
  '/users/:user_id/phones/:phone_id',
  PhoneNumberController.update
);

phoneNumberRoutes.delete('/phones/:phone_id', PhoneNumberController.delete);

module.exports = phoneNumberRoutes;
