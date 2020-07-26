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
  async handle({ response, auth }, next) {
    let authorized = false;
    try {
      await auth.check();
      authorized = true;
    } catch (err) {
      authorized = false;
    }

    if (!authorized) {
      try {
        await auth.authenticator('admin').check();
      } catch (err) {
        return response.status(400).json({ message: 'Unauthorized' });
      }
    }

    await next();
  }
}

module.exports = AppAuth;
