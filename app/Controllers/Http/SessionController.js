const User = use('App/Models/User');
const Mail = use('Mail');
const Env = use('Env');
const { OAuth2Client } = use('google-auth-library');
class SessionController {
  async authenticate({ request, auth }) {
    var { email, password } = request.post();
    email = email.trim();

    const token = await auth.attempt(email, password);
    const user = await User.findBy({ email });

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

  async google({ ally, request, auth, response }) {
    try {
      const { idToken } = request.post();
      const CLIENT_ID =
        '899085435916-qprjg7phppua09ftfukoijm72u9tv456.apps.googleusercontent.com';
      const CLIENT_ID_MOBILE =
        '899085435916-scpt0i59vgtjoj6f9n991of7kvp41tce.apps.googleusercontent.com';
      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken,
        audience: [CLIENT_ID_MOBILE],
      });

      const gUser = ticket.getPayload();
      const userDetails = {
        email: gUser.email,
        name: gUser.name,
        oauth: idToken,
        is_activated: true,
      };

      const whereClause = {
        email: gUser.email,
      };

      const user = await User.findOrCreate(whereClause, userDetails);
      return auth.authenticator('jwt').generate(user);
    } catch (err) {
      console.log(err);
      return response.status(400).json({ message: 'Erro ao fazer Login' });
    }
  }
}

module.exports = SessionController;
