'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProfileSchema extends Schema {
  up() {
    this.create('profiles', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .unique();

      table.enu('escolaridade', [
        'Ensino Fundamental Incompleto',
        'Ensino Fundamental Completo',
        'Ensino Médio Incompleto',
        'Ensino Médio Completo',
        'Ensino Superior Incompleto',
        'Ensino Superior Completo',
      ]);
      table.boolean('is_from_public').notNullable();
      table.enu('area', ['Humanas', 'Linguagens', 'Exatas', 'Saúde']);
      table.timestamps();
    });
  }

  down() {
    this.drop('profiles');
  }
}

module.exports = ProfileSchema;
