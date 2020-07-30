const User = use('App/Models/User');
const Mail = use('Mail');
const Env = use('Env');

class SessionController {
  async authenticate({ request, auth }) {
    const { email, password } = request.post();
    const token = await auth.attempt(email, password);
    const user = await User.findBy('email', email);
    user.password = undefined;
    const response = {
      user,
      token,
    };
    return response;
  }

  async forgotPassword({ request, auth, response }) {
    try {
      const { email } = request.post();
      const user = await User.findBy('email', email);
      const token = await auth.generate(user);

      const url = `${Env.get('FRONT_URL')}/resetpass/token=${token}`;

      await Mail.send(
        'emails.forgotpassword',
        {
          name,
          url,
        },
        (message) => {
          message
            .from(
              'Teste <postmaster@sandboxa5218ba10a414287bb43e8064c4bb3d4.mailgun.org>'
            )
            .to(user.email)
            .subject('Recuperar senha');
        }
      );

      response.send(204);
    } catch (error) {
      console.log(error);
    }
  }

  async confirmEmail({ params, auth, response }) {
    try {
      const token = await auth.authenticator('jwt')._verifyToken(params.token);

      const user = await User.findBy('id', token.uid);

      user.is_activated = true;

      await user.save();

      await auth.authenticator('jwt').revokeTokens([token], true);

      response.status(204).redirect(Env.get('FRONT_URL'));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = SessionController;
