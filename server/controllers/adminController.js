const { Admin } = require('../models/models');

class AdminController {
  async getAll(req, res) {
    try {
      const admins = await Admin.findAll({
        attributes: { exclude: ['password'] },
      });

      return res.json(admins);
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
      const admin = await Admin.findOne({
        where: { id: id },
        attributes: { exclude: ['password'] },
      });

      if (admin === null) {
        return res.sendStatus(404);
      }

      return res.json(admin);
    } catch (err) {
      return res.sendStatus(500);
    }
  }


  async getProfile(req, res) {
    const id = req.adminId;

    if (isNaN(id)) {
      return res.sendStatus(400);
    }

    try {
      const user = await Admin.findOne({
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
}


module.exports = new AdminController();