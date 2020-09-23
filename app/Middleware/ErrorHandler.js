'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const UserException = use('App/Exceptions/UserException');
class ErrorHandler {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response }, next) {
    try {
      return await next();
    } catch (error) {
      if (typeof error === UserException) {
        return response
          .status(error.status)
          .json({ message: error.message, code: error.code });
      }
      return response
        .status(500)
        .json({ message: error.message, code: 'SERVER_ERROR' });
    }
  }
}

module.exports = ErrorHandler;
