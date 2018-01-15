const _ = require('underscore');
const path = require('path');
const requireDir = require('requiredir');
const coins = requireDir(path.join(__dirname, '../../data/coins')).toArray();
const mongoose = require('mongoose');
const axios = require('axios');
const Store = mongoose.model('Store');
const Coin = mongoose.model('Coin');
// const storeList = requireDir(path.join(__dirname, '../../data/stores')).toArray();


// Get a list of stores
const findStores = (id) =>  {
	return new Promise((resolve, reject) => {
		Store.find({coins: id})
			.where({published: true})
			.sort({verified: -1, _createdAt: -1})
			.populate('coins')
			.exec((err, stores) => {
				if(err){
					console.log(err);
					reject(err);
				}
				resolve(stores)
				// return stores;
			});
	})

}

// Get the market details
const getCoinMarketDetails = (name) => {
	return new Promise((resolve, reject) => {
		axios.get(`https://api.coinmarketcap.com/v1/ticker/${name}/?convert=GBP`)
			.then((response) => {
				resolve(response.data[0]);
			})
			.catch((err) => {
				console.error(err);
				reject(err)
			});
	});
}



module.exports = (req, res) => {
	// Filter the coin list to the matching marketCode
	let locals = res.locals;

  // Find the coin in the DB
	Coin.findOne({marketCode: req.params.coin, published: true}).exec((err, coin) => {
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


      // Async fetch data
			const getData = async () => {
				locals.data.stores = await findStores(coin._id);
				locals.data.marketCap = await getCoinMarketDetails(coin.name);
				console.log(locals.data);
			}

			getData()
				.then(() => {
					res.render('coinListing');
				})
				.catch((err) => {
					res.render('error', {error: {message:`The server could not find any stores`, code: 500}});
				});
		}
	});
}
