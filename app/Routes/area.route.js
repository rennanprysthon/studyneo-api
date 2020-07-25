const Route = use('Route');

Route.get('/areas', 'AreaController.index').middleware('appAuth');

module.exports = Route;
