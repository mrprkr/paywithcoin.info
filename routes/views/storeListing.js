const mongoose = require('mongoose');
const Store = mongoose.model('Store');

module.exports = (req, res) => {
	let locals = res.locals;
	locals.data = {}

	locals.page.title = `Pay With Coin | Stores`;

	Store.find()
		.where({published: !req.query.unpublished})
		.sort({verified: -1, _createdAt: -1})
		.populate('coins')
		.exec((err, stores) => {
		if(err){
			res.render('error', {error: {message:`The server could not find any stores`, code: 500}});
		}

		locals.data.stores = stores;
		res.render('storeListing');
	});
}
