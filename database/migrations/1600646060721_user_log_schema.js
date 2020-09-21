'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserLogSchema extends Schema {
  up() {
    this.create('user_logs', (table) => {
      table.increments();
      table.string('user_email');
      table.string('description');
      table.string('field_changed');
      table.string('field_last_value');
      table.string('field_new_value');
      table.string('timestamp');
    });
  }

  down() {
    this.drop('user_logs');
  }
}

module.exports = UserLogSchema;
