const views = require('requiredir')('./views');
const middleware = require('./middleware');

module.exports = (app) => {
  // Middleware for all routes
	app.use(middleware.initLocals);

  // Index view
	app.get('/', views.index);
	app.get('/coin/:coin', views.shopListing);
	app.get('/store/:store', views.shopProfile);
	app.get('/submit', views.submit);
	app.get('*', (req, res) => res.render('error'));
}
