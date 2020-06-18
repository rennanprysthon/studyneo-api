const Mail = use('Mail');
const Env = use('Env');
const User = use('App/Models/User');
const Redis = use('Redis');
const bcrypt = use('bcrypt');
const crypto = use('crypto');
class UserController {
  async store({ request }) {
    const { name, email, password } = request.post();
    try {
      const user = await User.create({
        name,
        email,
        password,
        is_activated: false,
      });

      const confirmEmailToken = await bcrypt.hashSync(email, 10);
      const key = crypto.randomBytes(3).toString('HEX').toUpperCase();
      await Redis.set(key, confirmEmailToken);

      //const { token } = await auth.generate(user);
      try {
        await Mail.send(
          'emails.welcome',
          {
            name,
            key,
          },
          (message) => {
            message
              .from('no-reply<noreply@studyneo.com.br>')
              .to(user.email)
              .subject('Confirmar email');
          }
        );
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
}

module.exports = UserController;
