'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AlternativesSchema extends Schema {
  up() {
    this.create('alternatives', (table) => {
      table.increments();
      table.string('body');
      table
        .integer('question_id')
        .unsigned()
        .references('id')
        .inTable('questions')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.boolean('isCorrect');
      table.timestamps();
    });
  }

  down() {
    this.drop('alternatives');
  }
}

module.exports = AlternativesSchema;
