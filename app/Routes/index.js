'use strict';

require('./auth.route');
require('./users.route');
require('./profile.route');
require('./subject.route');

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
  return {
    name: 'API para o aplicativo do Studyneo',
    version: '0.0',
  };
});

module.exports = Route;

require('./admin.route');
