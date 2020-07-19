const Route = use('Route');

Route.post('/questions', 'QuestionController.create').middleware('admin');
Route.get('/questions', 'QuestionController.index');
Route.get('/questions/:subject_id', 'QuestionController.listBySubject');
Route.get('/questions/view/:id', 'QuestionController.show');
Route.put('/questions/:id', 'QuestionController.update').middleware('admin');
Route.delete('/questions/:id', 'QuestionController.destroy').middleware(
  'admin'
);

module.exports = Route;
