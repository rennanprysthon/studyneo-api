class SessionController {
  async authenticate({ request, auth }) {
    const { email, password } = request.post();
    const token = await auth.withRefreshToken().attempt(email, password);

    return token;
  }
}

module.exports = SessionController;
