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
  async handle({ response, auth }, next) {
    try {
      await auth.authenticator('admin').check();
    } catch (err) {
      return response.status(400).json({ message: 'Unauthorized' });
    }
    await next();
  }
}

module.exports = Admin;
