const Route = use('Route');

Route.post('/subjects', 'SubjectController.create').middleware('admin');
Route.get('/subjects', 'SubjectController.index').middleware('appAuth');
Route.get('/subjects/:id', 'SubjectController.show').middleware('appAuth');
Route.put('/subjects/:id', 'SubjectController.update').middleware('admin');
Route.delete('/subjects/:id', 'SubjectController.destroy').middleware('admin');

module.exports = Route;
