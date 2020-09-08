const Route = use('Route');

Route.get('/feed', 'FeedController.index').middleware('auth');
