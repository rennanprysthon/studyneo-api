'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Matter extends Model {
  area() {
    return this.belongsTo('App/Models/Area');
  }

  subjects() {
    return this.hasMany('App/Models/Subject');
  }
}

module.exports = Matter;
