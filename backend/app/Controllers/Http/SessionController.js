const User = use('App/Models/User');
const Mail = use('Mail');

class SessionController {
  async authenticate({ request, auth }) {
    const { email, password } = request.post();
    const token = await auth.withRefreshToken().attempt(email, password);

    return token;
  }

  async forgotPassword({ request, auth, response }) {
    try {
      const { email } = request.post();
      const user = await User.findBy('email', email);
      const token = await auth.generate(user)

      return token;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = SessionController;
