'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('/auth', 'SessionController.authenticate');
Route.post('/auth/forgot', 'SessionController.forgotPassword');
Route.get('/auth/confirm/:token', 'SessionController.confirmEmail');

module.exports = Route;
