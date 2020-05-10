'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.create')
Route.get('/users', 'UserController.showAll').middleware(['auth','refresh_token'])
Route.get('/users/:id', 'UserController.show').middleware(['auth','refresh_token'])
Route.put('/users', 'UserController.update').middleware(['auth','refresh_token'])
Route.delete('/users', 'UserController.remove').middleware(['auth','refresh_token'])

module.exports = Route;
