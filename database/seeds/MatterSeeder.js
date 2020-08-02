'use strict';

/*
|--------------------------------------------------------------------------
| MatterSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Database = use('Database');

class MatterSeeder {
  async run() {
    const data = await Database.select('*').from('matters');
    if (data.length === 0) {
      await Database.table('matters').insert([
        {
          title: 'Artes',
          area_id: 1,
        },
        {
          title: 'Educação Física',
          area_id: 1,
        },
        {
          title: 'Espanhol',
          area_id: 1,
        },
        {
          title: 'Gramática',
          area_id: 1,
        },
        {
          title: 'Inglês',
          area_id: 1,
        },
        {
          title: 'Literatura',
          area_id: 1,
        },
        {
          title: 'Redação',
          area_id: 1,
        },
        {
          title: 'Filosofia',
          area_id: 2,
        },
        {
          title: 'Geografia',
          area_id: 2,
        },
        {
          title: 'História',
          area_id: 2,
        },
        {
          title: 'Sociologia',
          area_id: 2,
        },
        {
          title: 'Biologia',
          area_id: 3,
        },
        {
          title: 'Física',
          area_id: 3,
        },
        {
          title: 'Química',
          area_id: 3,
        },
        {
          title: 'Matemática (álgebra)',
          area_id: 4,
        },
        {
          title: 'Matemática (geometria)',
          area_id: 4,
        },
      ]);
    }
  }
}

module.exports = MatterSeeder;
