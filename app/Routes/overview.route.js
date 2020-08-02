const Route = use('Route');

Route.post('/overviews', 'OverviewController.create').middleware('admin');
Route.get('/overviews', 'OverviewController.index').middleware('appAuth');
Route.get(
  '/overviews/:subject_id',
  'OverviewController.listBySubject'
).middleware('appAuth');
Route.get('/overviews/view/:overview_id', 'OverviewController.show').middleware(
  'appAuth'
);
Route.put('/overviews/:overview_id', 'OverviewController.update').middleware(
  'admin'
);
Route.delete(
  '/overviews/:overview_id',
  'OverviewController.destroy'
).middleware('admin');
