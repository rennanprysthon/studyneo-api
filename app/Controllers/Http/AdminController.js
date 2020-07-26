'use strict';
const Admin = use('App/Models/Admin');
class AdminController {
  async create({ request, response }) {
    try {
      const data = request.only(['name', 'email', 'password']);
      const admin = await Admin.create(data);
      return admin;
    } catch (err) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }
  async auth({ request, response, auth }) {
    const { email, password } = request.only(['email', 'password']);
    const token = await auth.authenticator('admin').attempt(email, password);
    return token;
  }
  async index() {
    const admins = await Admin.all();

    return admins;
  }

  async show({ request, response }) {
    const { id } = request.params;
    const admin = await Admin.find(id);
    if (!admin)
      return response.status(404).json({ message: 'Admin not found' });
    return admin;
  }
  async update({ request, response }) {
    const { id } = request.params;
    const data = request.only(['name', 'email', 'password']);
    const admin = await Admin.find(id);
    if (!admin)
      return response.status(404).json({ message: 'Admin not found' });
    admin.merge(data);
    try {
      await admin.save();
    } catch (err) {
      return response.status(400).json({ message: 'Operation not permited' });
    }

    return admin;
  }
  async destroy({ request, response }) {
    const { id } = request.params;
    const admin = await Admin.find(id);
    if (!admin)
      return response.status(404).json({ message: 'Admin not found' });
    await admin.delete();
    return;
  }
}

module.exports = AdminController;
