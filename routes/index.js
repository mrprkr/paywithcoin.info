const views = require('requiredir')('./views');
const api = require('requiredir')('./api');

const middleware = require('./middleware');

module.exports = (app) => {
  // Middleware for all routes
	app.use(middleware.initLocals);

  // Index view
	app.get('/', views.index);
	app.get('/coin/:coin', views.coinListing);
	app.get('/stores', views.storeListing);
	app.get('/stores/:store', views.shopProfile);
	app.get('/submit', views.submit);

	app.get('/api/og', api.getOgContent);
	app.get('/api/addStoreByUrl', api.addStoreByUrl);

	app.get('*', (req, res) => res.render('error'));
}
