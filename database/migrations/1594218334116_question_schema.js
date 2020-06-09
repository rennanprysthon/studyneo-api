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
      table.string('enunciado');
      table.string('alternativaA');
      table.string('alternativaB');
      table.string('alternativaC');
      table.string('alternativaD');
      table.string('alternativaE');
      table.enum('correta', ['A', 'B', 'C', 'D', 'E']);
      table.timestamps();
    });
  }

  down() {
    this.drop('questions');
  }
}

module.exports = QuestionSchema;
