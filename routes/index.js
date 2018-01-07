const views = require('requiredir')('./views');
const middleware = require('./middleware');

module.exports = (app) => {
  // Middleware for all routes
	app.use(middleware.initLocals);

  // Index view
	app.get('/', (req, res) => {
		res.render('index');
	});

	app.get('/:coin', views.shopListing);
	app.get('/:coin/:store', views.shopProfile);
}
