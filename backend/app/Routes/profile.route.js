const Route = use('Route');

Route.post('/profiles/:user_id', 'ProfileController.create');
Route.put('/profiles/:user_id', 'ProfileController.update');
Route.get('/profiles/:user_id', 'ProfileController.show');
Route.delete('/profiles/:user_id', 'ProfileController.destroy');

module.exports = Route;
