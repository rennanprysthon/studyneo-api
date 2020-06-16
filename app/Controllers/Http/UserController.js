const Mail = use('Mail');
const Env = use('Env');

const User = use('App/Models/User');
class UserController {
  async store({ request, auth }) {
    const { name, email, password } = request.post();
    try {
      const user = await User.create({
        name,
        email,
        password,
        is_activated: false,
      });

      const { token } = await auth.generate(user);

      try {
      } catch (error) {
        console.log(error);
      }

      return user;
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

  async showAll() {
    return await User.all();
  }

  async update({ request, auth, response }) {
    try {
      const { uid } = auth.jwtPayload;
      const { name, email, password, cpf } = request.post();
      const user = await User.find(uid);

      user.name = name;
      user.email = email;
      user.password = password;
      user.cpf = cpf;

      await user.save();

      return { name, email, password, cpf };
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
}

module.exports = UserController;
