const { User } = require("../models/models");
const bcrypt = require("bcrypt");

class UserController {
  async getAll(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });

      return res.json(users);
    } catch (err) {
      return res.sendStatus(500);
    }
  }

  async getOne(req, res) {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.sendStatus(400);
    }

    try {
      const user = await User.findOne({
        where: { id: id },
        attributes: { exclude: ["password"] },
      });

      if (user == null) {
        return res.sendStatus(404);
      }

      return res.json(user);
    } catch (err) {
      return res.sendStatus(500);
    }
  }

  async create(req, res) {
    try {
      const user = { ...req.body };

      if ((await User.findOne({ where: { email: user.email } })) !== null) {
        return res.status(400).json({ error: "Email is taken" });
      }

      user.password = await bcrypt.hash(user.password, 10);

      const createdUser = await User.create(user);

      return res.status(201).json(createdUser);
    } catch (err) {
      return res.sendStatus(500);
    }
  }

  async update(req, res) {
    const { id } = req.params;

    const user = { ...req.body };

    if (isNaN(id) || parseInt(id) !== user.id) {
      return res.sendStatus(400);
    }

    if ((await User.findOne({ where: { id: id } })) == null) {
      return res.sendStatus(404);
    }

    try {
      await User.update(user, { where: { id: id } });

      return res.sendStatus(204);
    } catch (err) {
      return res.sendStatus(500);
    }
  }
}

module.exports = new UserController();