const Users = require('../models/Users');
const Addresses = require('../models/Addresses');

module.exports = {
  async findAllUserAddresses(req, res) {
    const { user_id } = req.params;

    const user = await Users.findByPk(user_id, {
      include: { association: 'addresses' },
    });

    return res.json(user.addresses);
  },

  async create(req, res) {
    const { user_id } = req.params;
    const { zipcode, street, number } = req.body;

    const user = await Users.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    try {
      const newAddress = await Addresses.create({
        zipcode,
        street,
        number,
        user_id,
      });

      return res.json(newAddress);
    } catch (e) {
      return res.json(e.message);
    }
  },
};
