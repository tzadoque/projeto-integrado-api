const Users = require('../models/Users');
const Addresses = require('../models/Addresses');

module.exports = {
  async findAllAddresses(req, res) {
    try {
      const addresses = await Addresses.findAll();

      return res.json(addresses);
    } catch (e) {
      return res.json(e.message);
    }
  },

  async findAddressById(req, res) {
    const { address_id } = req.params;

    try {
      const address = await Addresses.findByPk(address_id);

      if (!address) {
        return res.json({ message: 'Address not found' });
      }

      return res.json(address);
    } catch (e) {
      return res.json(e.message);
    }
  },

  async findAllUserAddresses(req, res) {
    const { user_id } = req.params;

    const user = await Users.findByPk(user_id, {
      include: { association: 'addresses' },
    });

    if (!user) {
      return res.json({ message: `User not found` });
    }

    return res.json(user.addresses);
  },

  async create(req, res) {
    const { user_id } = req.params;
    const { zipcode, street, number } = req.body;

    const user = await Users.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    try {
      const [address, created] = await Addresses.findOrCreate({
        where: {
          user_id,
          zipcode,
          street,
          number,
        },
        defaults: {
          zipcode,
          street,
          number,
          user_id,
        },
      });

      return created
        ? res.json({ message: `Address was created`, address })
        : res.json({ message: `Address already exists`, address });
    } catch (e) {
      return res.json(e.message);
    }
  },

  async update(req, res) {
    const { user_id, address_id } = req.params;
    const { zipcode, street, number } = req.body;

    const updatedFields = { zipcode, street, number };

    const user = await Users.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    try {
      const address = await Addresses.findOne({
        where: {
          user_id: Number(user_id),
          id: Number(address_id),
        },
      });

      if (!address) {
        return res.status(400).json({ message: `Address not found` });
      }

      await Addresses.update(updatedFields, {
        where: {
          id: Number(address_id),
        },
      });

      const updatedAddress = await Addresses.findByPk(address_id);

      return res.json({ message: `Address was updated`, updatedAddress });
    } catch (e) {
      return res.json(e.message);
    }
  },

  async delete(req, res) {
    const { address_id } = req.params;

    try {
      const address = await Addresses.findByPk(address_id);

      if (!address) {
        return res.json({ message: 'Address not found' });
      }

      await Addresses.destroy({
        where: {
          id: Number(address_id),
        },
      });

      return res.json({ message: `Deleted address` });
    } catch (e) {
      return res.json(e.message);
    }
  },
};
