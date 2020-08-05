const Route = use('Route');

Route.post('/texts', 'TextController.create').middleware('admin');
Route.get('/texts', 'TextController.index').middleware('appAuth');
Route.get('/texts/view/:text_id', 'TextController.show').middleware('appAuth');
Route.get('/texts/:subject_id', 'TextController.listBySubject').middleware(
  'appAuth'
);
Route.delete('/texts/:text_id', 'TextController.destroy').middleware('admin');
Route.put('/texts/:text_id', 'TextController.update').middleware('admin');

module.exports = Route;
