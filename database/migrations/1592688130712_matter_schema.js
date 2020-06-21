'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MatterSchema extends Schema {
  up() {
    this.create('matters', (table) => {
      table.increments();
      table
        .integer('area_id')
        .unsigned()
        .references('id')
        .inTable('areas')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('title');
      table.timestamps();
    });
  }

  down() {
    this.drop('matters');
  }
}

module.exports = MatterSchema;
