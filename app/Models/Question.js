'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Question extends Model {
  subject() {
    return this.belongsTo('App/Models/Subject');
  }
  alternatives() {
    return this.hasMany('App/Models/Alternative');
  }
  texts() {
    return this.hasMany('App/Models/Text');
  }
}

module.exports = Question;
