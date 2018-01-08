const _ = require('underscore');
const path = require('path');
const requireDir = require('requiredir');
const coins = requireDir(path.join(__dirname, '../../data/coins')).toArray();
const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const Coin = mongoose.model('Coin');
// const storeList = requireDir(path.join(__dirname, '../../data/stores')).toArray();


module.exports = (req, res) => {
	// Filter the coin list to the matching marketCode
	let locals = res.locals;

  // Find the coin in the DB
	Coin.findOne({marketCode: req.params.coin}).exec((err, coin) => {
		if(!coin || err) {
      // If none was found
			res.render('error', {error: {message:`The coin ${req.params.coin} does not exist`, code: 404}});
			console.error(err);
		}
		else {
			locals.data = {
				coin
			}

			locals.page.title = `Pay With Coin | ${coin.name}`;

			Store.find({coins: coin._id})
			.where({published: true})
			.sort({verified: -1, _createdAt: -1})
			.populate('coins')
			.exec((err, stores) => {
				if(err){
					res.render('error', {error: {message:`The server could not find any stores`, code: 500}});
				}

				locals.data.stores = stores;
				res.render('coinListing');
			})
		}
	});
}
