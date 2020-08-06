const Route = use('Route');

Route.post('/texts', 'TextController.create').middleware('admin');
Route.get('/texts', 'TextController.index').middleware('appAuth');
Route.get('/texts/view/:text_id', 'TextController.show').middleware('appAuth');
Route.get('/texts/:question_id', 'TextController.listQuestion').middleware(
  'appAuth'
);
Route.delete('/texts/:text_id', 'TextController.destroy').middleware('admin');
Route.put('/texts/:text_id', 'TextController.update').middleware('admin');

module.exports = Route;
