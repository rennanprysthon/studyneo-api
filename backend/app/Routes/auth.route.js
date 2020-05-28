'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('/login', 'SessionController.authenticate');
Route.post('/forgot', 'SessionController.forgotPassword');

module.exports = Route;
