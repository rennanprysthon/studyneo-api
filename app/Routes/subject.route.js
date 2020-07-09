const Route = use('Route');

Route.post('/subjects', 'SubjectController.create');
Route.get('/subjects', 'SubjectController.index');
Route.get('/subjects/:id', 'SubjectController.show');
Route.put('/subjects/:id', 'SubjectController.update').middleware('admin');
Route.delete('/subjects/:id', 'SubjectController.destroy').middleware('admin');

module.exports = Route;
