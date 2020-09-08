'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database');

class FeedController {
  async index({ request }) {
    const { name = 'overviews' } = request.get();

    const data = await Database
      .table(name)
      .orderBy('created_at', 'desc')
      .limit(5);

    return data;
  }
}

module.exports = FeedController
