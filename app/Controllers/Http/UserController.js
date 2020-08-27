const Mail = use('Mail');
const Env = use('Env');

const User = use('App/Models/User');
const Redis = use('Redis');
const bcrypt = use('bcrypt');
const crypto = use('crypto');
const Database = use('Database');

class UserController {
  async store({ request }) {
    const { name, email, password } = request.post();
    try {
      const user = await User.create({
        name: name.trim(),
        email: email.trim().replace(/\s/g, ''),
        password: password.trim().replace(/\s/g, ''),
        is_activated: true,
      });

      //CONFIRM EMAIL (JUST REMOVE THE COMMENTS)
      // const confirmEmailToken = await bcrypt.hashSync(email, 10);
      // const key = crypto.randomBytes(3).toString('HEX').toUpperCase();
      // await Redis.set(key, confirmEmailToken);

      // //const { token } = await auth.generate(user);
      // try {
      //   await Mail.send(
      //     'emails.welcome',
      //     {
      //       name,
      //       urlConfirmacao: `${Env.get('APP_URL')}/auth/confirm/${token}`,
      //     },
      //     (message) => {
      //       message
      //         .from(
      //           'Studyneo <postmaster@sandboxa5218ba10a414287bb43e8064c4bb3d4.mailgun.org>'
      //         )
      //         .to(user.email)
      //         .subject('Confirmar email');
      //     }
      //   );
      // } catch (error) {
      //   console.log(`Erro ao enviar o email: ${error}`);
      // }

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

  async showAll({ request }) {
    const { page = 1, perPage = 20 } = request.get();

    const users = await Database.select(
      'id',
      'name',
      'email',
      'is_activated',
      'created_at',
      'updated_at'
    )
      .from('users')
      .orderBy('users.name', 'cresc')
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
