const Users = require('../models/Users');
const PhoneNumbers = require('../models/PhoneNumbers');

module.exports = {
  async findAllPhoneNumbers(req, res) {
    try {
      const phone_numbers = await PhoneNumbers.findAll();

      return res.json(phone_numbers);
    } catch (e) {
      return res.json(e.message);
    }
  },

  async findPhoneNumberById(req, res) {
    const { phone_id } = req.params;

    try {
      const phone_number = await PhoneNumbers.findByPk(phone_id);

      if (!phone_number) {
        return res.json({ message: 'Phone number not found' });
      }

      return res.json(phone_number);
    } catch (e) {
      return res.json(e.message);
    }
  },

  async findAllUserPhoneNumbers(req, res) {
    const { user_id } = req.params;

    const user = await Users.findByPk(user_id, {
      include: { association: 'phone_numbers' },
    });

    if (!user) {
      return res.json({ message: `User not found` });
    }

    return res.json(user.phone_numbers);
  },

  async create(req, res) {
    const { user_id } = req.params;
    const { number } = req.body;

    const user = await Users.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    try {
      const [phone_number, created] = await PhoneNumbers.findOrCreate({
        where: {
          user_id,
          number,
        },
        defaults: {
          number,
        },
      });

      return created
        ? res.json({ message: `Phone number was created`, phone_number })
        : res.json({ message: `Phone number already exists`, phone_number });
    } catch (e) {
      return res.json(e.message);
    }
  },

  async update(req, res) {
    const { user_id, phone_id } = req.params;
    const { number } = req.body;

    const user = await Users.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    try {
      const phone_number = await PhoneNumbers.findOne({
        where: {
          user_id: Number(user_id),
          id: Number(phone_id),
        },
      });

      if (!phone_number) {
        return res.status(400).json({ message: `Phone number not found` });
      }

      await PhoneNumbers.update(
        { number },
        {
          where: {
            id: Number(phone_id),
          },
        }
      );

      const updatedPhoneNumber = await PhoneNumbers.findByPk(phone_id);

      return res.json({
        message: `Phone number was updated`,
        updatedPhoneNumber,
      });
    } catch (e) {
      return res.json(e.message);
    }
  },

  async delete(req, res) {
    const { phone_id } = req.params;

    try {
      const phone_number = await PhoneNumbers.findByPk(phone_id);

      if (!phone_number) {
        return res.json({ message: 'Phone number not found' });
      }

      await PhoneNumbers.destroy({
        where: {
          id: Number(phone_id),
        },
      });

      return res.json({ message: `Deleted phone number` });
    } catch (e) {
      return res.json(e.message);
    }
  },
};
