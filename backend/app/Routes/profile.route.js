const Route = use('Route');

Route.post('/profiles', 'ProfileController.create').middleware('auth');
Route.put('/profiles', 'ProfileController.update').middleware('auth');
Route.get('/profiles', 'ProfileController.show').middleware('auth');
Route.delete('/profiles', 'ProfileController.destroy').middleware('auth');

module.exports = Route;
