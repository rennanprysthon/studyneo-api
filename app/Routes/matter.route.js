const Route = use('Route');

Route.get('/matters', 'MatterController.index');

module.exports = Route;
