exports = module.exports;
const mongoose = require('mongoose');
const Store = mongoose.model('Store');


exports.redirectWithFilterParams = (req, res) => {
  // take the submitted form and turn it into url params;

	let filterContext = {};
	
}

exports.renderStoreList = (req, res) => {
	let data = res.locals.data = {};
	let appliedFilters = data.appliedFilters = {};

	function getListOfStores() {
		return new Promise((resolve, reject) => {
      // Set up the search context
			let searchContext = {};
			if(req.query.published){
				searchContext.published = req.query.published;
				appliedFilters.published = req.query.published;
			}

			Store.find(searchContext)
				.populate('coins')
				.exec((err, stores) => {
					if(err) reject(err);
					else resolve(stores);
				});
		});
	}

	async function preparePageData() {
		data.stores = await getListOfStores();
	}

	preparePageData()
		.then(() => {
			res.render('manageStores');
		})
		.catch((err) => {
			console.error(err)
			res.render('error', {error: {message:`The server could not find any stores`, code: 500}});
		});
}
