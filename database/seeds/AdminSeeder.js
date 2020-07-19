'use strict';

/*
|--------------------------------------------------------------------------
| AdminSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Database = use('Database');
const Admin = use('App/Models/Admin');
class AdminSeeder {
  async run() {
    const data = await Database.select('*').from('admins');
    if (data.length === 0) {
      await Admin.create({
        name: 'Admin',
        email: 'admin@domain.com',
        password: '123456',
      });
    }
  }
}

module.exports = AdminSeeder;
