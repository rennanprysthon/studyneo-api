const Route = use('Route');

Route.post('/subjects', 'SubjectController.create');
Route.get('/subjects', 'SubjectController.index');
Route.get('/subjects/:id', 'SubjectController.show');
Route.put('/subjects/:id', 'SubjectController.update');
Route.delete('/subjects/:id', 'SubjectController.destroy');

module.exports = Route;
