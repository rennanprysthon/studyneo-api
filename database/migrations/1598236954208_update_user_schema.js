'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UpdateUserSchema extends Schema {
  up() {
    this.table('users', (table) => {
      table.text('oauth');
      table.string('password').alter();
    });
  }

  down() {
    this.table('users', (table) => {
      table.string('password').notNullable();
      table.dropColumn('oauth');
    });
  }
}

module.exports = UpdateUserSchema;
