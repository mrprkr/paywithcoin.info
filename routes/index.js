const path = require('path')
const views = require('requiredir')(path.resolve(__dirname, './views'));
const api = require('requiredir')(path.resolve(__dirname, './api'));

const middleware = require('./middleware');

module.exports = (app) => {
  // Middleware for all routes
	app.use(middleware.initLocals);

  // Index view
	app.get('/', views.index);
	app.get('/coin/:coin', views.coinListing);
	app.get('/stores', views.storeListing);
	app.get('/stores/:store', views.shopProfile);
	app.get('/submit', views.submit.getSubmitPage);
	app.post('/submit', views.submit.handleSubmitForm);

	app.get('/manage/stores', views.manageStores.renderStoreList);
	app.post('/manage/stores', views.manageStores.redirectWithFilterParams);
	
	app.get('/api/og', api.getOgContent);
	app.get('/api/addStoreByUrl', api.addStoreByUrl);

	app.get('*', (req, res) => res.render('error'));
}
