const User = require('../models/User');
const validateCPF = require('../hooks/validateCPF.js');
const bcrypt = require('bcrypt');
const generateToken = require('../hooks/generateToken.js');

module.exports = {
  async login(req, res) {
    try {
      const { cpf, password } = req.body;

      if (!cpf || !password) {
        return res.json({ message: 'Preencha os campos obrigatórios.' });
      }

      if (!validateCPF(cpf)) {
        return res.json({ message: 'O cpf informado não é válido' });
      }

      const user = await User.scope('withPassword').findOne({
        where: {
          cpf: cpf,
        },
      });

      if (!user) {
        return res
          .status(400)
          .json({ message: 'O cpf informado não está cadastrado' });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Senha inválida' });
      }

      user.password = undefined;

      return res
        .status(200)
        .json({ user, token: generateToken({ cpf: user.cpf }) });
    } catch (e) {
      return res.json(e.message);
    }
  },
};
