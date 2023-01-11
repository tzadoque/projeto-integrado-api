const Users = require('../models/Users.js');
const validateCPF = require('../hooks/validateCPF.js');
const isAnInvalidEmail = require('../hooks/validateEmail.js');
const isAnInvalidPassword = require('../hooks/validatePassword');
const bcrypt = require('bcrypt');
const generateToken = require('../hooks/generateToken');

module.exports = {
  async findAll(req, res) {
    try {
      const users = await Users.findAll();
      return res.json(users);
    } catch (e) {
      return res.json(e.message);
    }
  },

  async findById(req, res) {
    try {
      const { id } = req.params;

      const user = await Users.findByPk(id);

      if (!user) {
        return res.json({ message: 'Usuário não encontrado' });
      }

      return res.json(user);
    } catch (e) {
      return res.json(e.message);
    }
  },

  async findByCpf(req, res) {
    try {
      const { cpf } = req.params;

      const user = await Users.findOne({
        where: {
          cpf: cpf,
        },
      });

      if (!user) {
        return res.json({ message: 'Usuário não encontrado' });
      }

      return res.json(user);
    } catch (e) {
      return res.json(e.message);
    }
  },

  async create(req, res) {
    try {
      const { cpf, name, email, password, confirmPassword } = req.body;

      // verificação de campos obrigatórios
      if (!name || !email || !password || !confirmPassword || !cpf) {
        return res
          .status(400)
          .json({ message: 'Preencha os campos obrigatórios' });
      }

      // validação do nome
      if (name.length < 3) {
        return res
          .status(400)
          .json({ message: 'O nome precisa ter no mínimo 3 caracteres' });
      }

      // validação de email
      if (isAnInvalidEmail(email)) {
        const message = isAnInvalidEmail(email).message;
        return res.status(400).json({ message });
      }

      const checkUserEmail = await Users.findOne({
        where: {
          email: email,
        },
      });

      if (checkUserEmail) {
        return res.status(400).json({
          message: 'Esse email já está sendo usado em uma conta',
        });
      }

      // validação de cpf
      const checkUserCpf = await Users.findOne({
        where: {
          cpf: cpf,
        },
      });

      if (checkUserCpf) {
        return res.status(400).json({
          message: 'Esse cpf já está sendo usado',
        });
      }

      if (!validateCPF(cpf)) {
        return res.status(400).json({
          message: 'O cpf informado não é válido',
        });
      }

      // validação de senha
      if (password != confirmPassword) {
        return res.status(400).json({
          message:
            "Os campos 'senha' e 'confirme sua senha' precisam ser iguais",
        });
      }

      if (isAnInvalidPassword(password)) {
        const message = isAnInvalidPassword(password).message;

        return res.status(400).json({ message });
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      // criando o usuário
      const newUser = await Users.create({
        name,
        email,
        cpf,
        password: passwordHash,
      });

      return res.json({ newUser, token: generateToken({ cpf: newUser.cpf }) });
    } catch (e) {
      return res.json(e.message);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { cpf, name, email, password, confirmPassword } = req.body;
      const updatedFields = {};

      const user = await Users.findByPk(id);

      if (!user) {
        return res.json({ message: `User not found` });
      }

      // validação do nome
      if (name) {
        if (name.length < 3) {
          return res
            .status(400)
            .json({ message: 'O nome precisa ter no mínimo 3 caracteres' });
        }

        updatedFields.name = name;
      }

      // validação do email
      if (email) {
        if (isAnInvalidEmail(email)) {
          const message = isAnInvalidEmail(email).message;
          return res.status(400).json({ message });
        }

        const checkUserEmail = await Users.findOne({
          where: {
            email: email,
          },
        });

        if (checkUserEmail && email != user.email) {
          return res.status(400).json({
            message: 'Esse email já está sendo usado em uma conta',
          });
        }

        updatedFields.email = email;
      }

      // validação de cpf
      if (cpf) {
        const checkUserCpf = await Users.findOne({
          where: {
            cpf: cpf,
          },
        });

        if (checkUserCpf && cpf != user.cpf) {
          return res.status(400).json({
            message: 'Esse cpf já está sendo usado',
          });
        }

        if (!validateCPF(cpf)) {
          return res.status(400).json({
            message: 'O cpf informado não é válido',
          });
        }

        updatedFields.cpf = cpf;
      }

      // validação da senha
      if (password) {
        if (password != confirmPassword) {
          return res.status(400).json({
            message:
              "Os campos 'senha' e 'confirme sua senha' precisam ser iguais",
          });
        }

        if (isAnInvalidPassword(password)) {
          const message = isAnInvalidPassword(password).message;

          return res.status(400).json({ message });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        updatedFields.password = passwordHash;
      }

      // atualizando o usuário
      await Users.update(updatedFields, {
        where: {
          id: Number(id),
        },
      });

      // buscando usuário atualizado para exibir no log
      const updatedUser = await Users.findByPk(id);

      return res.json(updatedUser);
    } catch (e) {
      return res.json(e.message);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      await Users.destroy({
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
