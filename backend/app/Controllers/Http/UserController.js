const User = use('App/Models/User');
const Mail = use('Mail');
const Env = use('Env')

class UserController {
  async store({ request, auth}) {
    const { name, email, password, cpf } = request.post();
    try {
      const user = await User.create({
        name,
        email,
        password,
        cpf,
        is_activated: false,
      });

      const { token } = await auth.generate(user)

      const urlConfirmacao = `${Env.get('APP_URL')}/auth/confirm/${token}`;

      await Mail.send('emails.welcome', {
        name,
        urlConfirmacao
      }, (message) => {
        message
          .from('Teste <postmaster@sandboxa5218ba10a414287bb43e8064c4bb3d4.mailgun.org>')
          .to(user.email)
          .subject('Confirmar email')
      });

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async show({ request, response }) {
    const { id } = request.params;
    const user = await User.find(id);
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
