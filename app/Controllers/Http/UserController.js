

const User = use('App/Models/User');
const Redis = use('Redis');
const bcrypt = use('bcrypt');
const Event = use('Event');

class UserController {
  async store({ request, auth }) {
    const { name, email, password } = request.post();
    try {
      const user = await User.create({
        name,
        email,
        password,
        is_activated: true,
      });

      Event.fire('new::user', user)

      await user.delete();
    } catch (error) {
      console.log(error);
    }
  }

  async show({ request, response }) {
    const { id } = request.params;
    const user = await User.query().where('id', id).with('endereco').fetch();

    if (!user) return response.status(404).send({ message: 'User not found' });
    return user;
  }

  async showAll({ request }) {
    const page = 1;

    const users = await User.query().paginate(page);

    return users;
  }

  async update({ request, auth, response }) {
    try {
      const { uid } = auth.jwtPayload;
      const data = request.post();
      const user = await User.find(uid);
      user.merge(data);
      await user.save();

      return user;
    } catch (err) {
      return response.status(400).send({ message: 'operation not permited' });
    }
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
    const confirmEmailToken = await bcrypt.hashSync(email, 10);
    console.log(confirmEmailToken, token)
    const matchingEmails = await bcrypt.compareSync(token, email);
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
