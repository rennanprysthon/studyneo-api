const User = use('App/Models/User');
const Redis = use('Redis');
const bcrypt = use('bcrypt');
const Database = use('Database');

const { CreateUserService, UpdateUserService } = use('App/Services/User');
class UserController {
  async store({ request }) {
    const { name, email, password } = request.post();
    const userService = new CreateUserService();
    return userService.exec({ name, email, password });
  }

  async show({ request, response }) {
    const { id } = request.params;
    const user = await User.query().where('id', id).fetch();
    if (!user) return response.status(404).send({ message: 'User not found' });
    return user;
  }

  async showAll({ request }) {
    const { page = 1, perPage = 20 } = request.get();

    const users = await Database.select(
      'id',
      'name',
      'email',
      'is_activated',
      'created_at',
      'updated_at',
    )
      .from('users')
      .paginate(page, perPage);
    users.total = Number(users.total);

    return users;
  }

  async findUserByEmail({ request, response }) {
    const { email } = request.params;
    const user = await User.findBy({ email: decodeURI(email) });
    if (!user) {
      return response.status(400).json({ message: 'User not found' });
    }
    return user;
  }

  async update({ request, auth, response }) {
    const { uid } = auth.jwtPayload;
    const data = request.post();
    const userService = new UpdateUserService();
    return userService.exec({ ...data, id: uid });
  }

  async remove({ auth, response }) {
    try {
      const { uid } = auth.jwtPayload;
      const user = await User.find(uid);
      if (!user)
        return response.status(404).send({ message: 'User not found' });
      await user.delete();
    } catch (err) {
      return response.status(400).send({ message: 'operation not permited' });
    }

    return;
  }
  async confirm({ request, auth, response }) {
    const { email, code } = request.post();
    const token = await Redis.get(code);
    const matchingEmails = await bcrypt.compareSync(email, token);
    if (!matchingEmails) {
      return response.status(400).json({ message: 'Unable to verify Email' });
    }
    const user = await User.findBy({ email });
    user.is_activated = true;
    await user.save();
    try {
      const sessionToken = await auth.newRefreshToken().generate(user);
      return sessionToken;
    } catch (err) {
      return response.status(400).json({ message: 'Unable to generate Token' });
    }
  }
}

module.exports = UserController;
