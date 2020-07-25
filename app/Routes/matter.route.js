const Route = use('Route');

Route.get('/matters', 'MatterController.index').middleware('appAuth');

module.exports = Route;
