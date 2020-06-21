'use strict';

/*
|--------------------------------------------------------------------------
| AreaSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Database = use('Database');

class AreaSeeder {
  async run() {
    const data = await Database.select('*').from('areas');
    if (data.length === 0) {
      await Database.table('areas').insert([
        {
          title: 'Linguagens',
        },
        {
          title: 'Humanas',
        },
        {
          title: 'Natureza',
        },
        {
          title: 'Exatas',
        },
      ]);
    }
  }
}

module.exports = AreaSeeder;
