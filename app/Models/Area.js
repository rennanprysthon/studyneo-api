'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Area extends Model {
  matters() {
    return this.hasMany('App/Models/Matter');
  }
}

module.exports = Area;
