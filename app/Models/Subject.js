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

  questions() {
    return this.hasMany('App/Models/Question');
  }
  overviews() {
    return this.hasMany('App/Models/Overview');
  }
}

module.exports = Subject;
