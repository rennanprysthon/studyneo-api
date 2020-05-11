'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.create')
Route.get('/users', 'UserController.showAll').middleware('auth')
Route.get('/users/:id', 'UserController.show').middleware('auth')
Route.put('/users', 'UserController.update').middleware('auth')
Route.delete('/users', 'UserController.remove').middleware('auth')

module.exports = Route;
