'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Endereco = use('App/Models/Endereco')

/**
 * Controller a ser utilizado posteriomente, quando forem adicionadas
 * mais regras de negocio
 */
class EnderecoController {
  /**
   * Show a list of all enderecos.
   * GET enderecos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const enderecos = Endereco.query().with('user').fetch();

    return enderecos;
  }

  /**
   * Display a single endereco.
   * GET enderecos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update endereco details.
   * PUT or PATCH enderecos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a endereco with id.
   * DELETE enderecos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = EnderecoController
