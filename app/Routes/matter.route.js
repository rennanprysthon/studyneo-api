const Route = use('Route');

Route.get('/matters', 'MatterController.index').middleware('appAuth');
Route.post('/matters', 'MatterController.create').middleware('admin');

module.exports = Route;
