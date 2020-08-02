'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class OverviewSchema extends Schema {
  up() {
    this.create('overviews', (table) => {
      table
        .integer('subject_id')
        .unsigned()
        .references('id')
        .inTable('subjects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.text('content');
      table.increments();
      table.timestamps();
    });
  }

  down() {
    this.drop('overviews');
  }
}

module.exports = OverviewSchema;
