'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Subject extends Model {
  matter() {
    return this.belongsTo('App/Models/Matter');
  }

  lessons() {
    return this.hasMany('App/Models/Lesson');
  }
}

module.exports = Subject;
