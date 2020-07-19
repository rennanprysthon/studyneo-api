'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class QuestionSchema extends Schema {
  up() {
    this.create('questions', (table) => {
      table.increments();
      table
        .integer('subject_id')
        .unsigned()
        .references('id')
        .inTable('subjects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.text('enunciado');
      table.text('question');
      table.string('key');
      table.timestamps();
    });
  }

  down() {
    this.drop('questions');
  }
}

module.exports = QuestionSchema;
