'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OverviewSchema extends Schema {
  up() {
    this.table('overviews', (table) => {
      table.string('title').defaultTo('');
    })
  }

  down() {
    this.table('overviews', (table) => {
      table.dropColumn('title');
    })
  }
}

module.exports = OverviewSchema
