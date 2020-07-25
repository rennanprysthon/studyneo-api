'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AppAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, auth }, next) {
    let authorized = false;
    try {
      await auth.check();
      const refresh_token = request.header('refresh_token');
      if (!refresh_token)
        return response.status(400).json({ message: 'missing refresh token' });
      const refreshed_token = await auth
        .newRefreshToken()
        .generateForRefreshToken(refresh_token);
      const user = auth.user;
      const token = auth.getAuthHeader();
      await user.tokens().where('token', token).update({ is_revoked: true });

      response.header('token', refreshed_token.token);
      response.header('refresh_token', refreshed_token.refreshToken);
      authorized = true;
    } catch (err) {
      authorized = false;
    }

    if (!authorized) {
      try {
        await auth.authenticator('admin').check();
        const refresh_token = request.header('refresh_token');
        if (!refresh_token) {
          return response
            .status(400)
            .json({ message: 'missing refresh token' });
        }
        const refreshed_token = await auth
          .authenticator('admin')
          .newRefreshToken()
          .generateForRefreshToken(refresh_token);
        const admin = auth.authenticator('admin').user;
        const token = auth.authenticator('admin').getAuthHeader();
        await admin.tokens().where('token', token).update({ is_revoked: true });

        response.header('token', refreshed_token.token);
        response.header('refresh_token', refreshed_token.refreshToken);
      } catch (err) {
        return response.status(400).json({ message: 'Unauthorized' });
      }
    }

    await next();
  }
}

module.exports = AppAuth;
