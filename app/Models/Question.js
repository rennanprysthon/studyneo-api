'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Question extends Model {
  matter() {
    return this.belongsTo('App/Models/Subject');
  }
}

module.exports = Question;
