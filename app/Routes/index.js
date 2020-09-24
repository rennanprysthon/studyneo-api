'use strict';

require('./auth.route');
require('./users.route');
require('./profile.route');
require('./subject.route');
require('./admin.route');
require('./area.route');
require('./matter.route');
require('./question.route');
require('./overview.route');
require('./text.route');
require('./feed.route');

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
  return {
    name: 'API para o aplicativo do Studyneo',
    version: '1.0',
  };
});

module.exports = Route;
