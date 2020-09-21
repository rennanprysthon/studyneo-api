'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/users/:id', 'UserController.show').middleware('auth');
Route.get('/users', 'UserController.showAll').middleware('admin');
Route.post('/users', 'UserController.store').validator('StoreUser');
Route.post('/users/confirm', 'UserController.confirm');
Route.delete('/users', 'UserController.remove').middleware('auth');
Route.put('/users', 'UserController.update').middleware('auth');

module.exports = Route;
