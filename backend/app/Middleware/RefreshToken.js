'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class RefreshToken {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, auth }, next) {
    const refresh_token = request.header('refresh_token')
    const refreshed_token  = await auth.generateForRefreshToken(refresh_token)

    const user = auth.current.user
    const token = auth.getAuthHeader()
    await user
      .tokens()
      .where('token', token)
      .update({ is_revoked: true })

    response.header('token',refreshed_token.token)
    response.header('refresh_token',refreshed_token.refreshToken)

    await next()

  }
}

module.exports = RefreshToken
