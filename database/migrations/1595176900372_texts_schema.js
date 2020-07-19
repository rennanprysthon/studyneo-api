'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TextsSchema extends Schema {
  up() {
    this.create('texts', (table) => {
      table.increments();
      table.text('content');
      table.string('title');
      table
        .integer('question_id')
        .unsigned()
        .references('id')
        .inTable('questions')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('texts');
  }
}

module.exports = TextsSchema;
