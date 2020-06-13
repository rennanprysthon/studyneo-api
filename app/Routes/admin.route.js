const Route = use('Route');

Route.post('/admin', 'AdminController.create').validator('StoreAdmin');
Route.post('/admin/login', 'AdminController.auth');
Route.get('/admin', 'AdminController.index').middleware('admin');
Route.get('/admin/:id', 'AdminController.show').middleware('admin');
Route.put('/admin/:id', 'AdminController.update').middleware('admin');
Route.delete('/admin/:id', 'AdminController.destroy').middleware('admin');
