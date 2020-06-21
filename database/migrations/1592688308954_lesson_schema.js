'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LessonSchema extends Schema {
  up() {
    this.create('lessons', (table) => {
      table.increments();
      table
        .integer('subject_id')
        .unsigned()
        .references('id')
        .inTable('subjects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('title');
      table.string('content');
      table.timestamps();
    });
  }

  down() {
    this.drop('lessons');
  }
}

module.exports = LessonSchema;
