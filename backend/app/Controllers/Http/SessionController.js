const User = use('App/Models/User');
const Mail = use('Mail');
const Env = use('Env');

class SessionController {
  async authenticate({ request, auth }) {
    const { email, password } = request.post();
    const token = await auth.withRefreshToken().attempt(email, password);

    return token;
  }

  async forgotPassword({ request, auth }) {
    try {
      const { email } = request.post();
      const user = await User.findBy('email', email);
      const token = await auth.generate(user)

      return token;
    } catch (error) {
      console.log(error);
    }
  }

  async confirmEmail({ params, auth, response }) {
    try {
      const token = await auth.authenticator('jwt')._verifyToken(params.token)

      const user = await User.findBy('id', token.uid)
      user.is_activated = true;
      await user.save()
      response.status(204).redirect(Env.get('FRONT_URL'))
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = SessionController;
