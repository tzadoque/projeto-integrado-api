const User = require('../models/User');

module.exports = {
  async findAll(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (e) {
      return res.json(e.message);
    }
  },

  async findById(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findOne({
        where: {
          id: Number(id),
        },
      });

      return res.json(user);
    } catch (e) {}
  },

  async create(req, res) {
    try {
      const { name, email } = req.body;

      const user = await User.create({ name, email });

      return res.json(user);
    } catch (e) {
      return res.json(e.message);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const json = req.body;

      await User.update(json, {
        where: {
          id: Number(id),
        },
      });

      const user = await User.findOne({
        where: {
          id: Number(id),
        },
      });

      return res.json(user);
    } catch (e) {
      return res.json(e.message);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      await User.destroy({
        where: {
          id: Number(id),
        },
      });

      return res.json({ message: `Usuário #${id} deletado com sucesso!` });
    } catch (e) {
      return res.json(e.message);
    }
  },
};
