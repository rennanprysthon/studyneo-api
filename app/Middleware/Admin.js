'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Admin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, auth }, next) {
    try {
      await auth.authenticator('admin').check();
      const refresh_token = request.header('refresh_token');
      if (!refresh_token) {
        return response.status(400).json({ message: 'missing refresh token' });
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
      await next();
    } catch (err) {
      return response.status(400).json({ message: 'Unauthorized' });
    }
  }
}

module.exports = Admin;
