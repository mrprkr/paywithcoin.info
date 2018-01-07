const _ = require('underscore');
const path = require('path');
const requireDir = require('requiredir');
const coins = requireDir(path.join(__dirname, '../../data/coins')).toArray();
const storeList = requireDir(path.join(__dirname, '../../data/stores')).toArray();


module.exports = (req, res) => {
  // Filter the coin list to the matching marketCode
	const matchingCoins = _.where(coins, {marketCode: req.params.coin});
	const coin = matchingCoins[0]; // There should only be 1 match

	if(!coin){
    // If the coin does not exist in the data set
		res.render('error', {error: {message:`The coin ${req.params.coin} does not exist`, code: 404}});
	} else {

		// Filter to supported stores
    // This logic is ineficient when dealing with large datasets
    // Should be migrated to database once entries are over 100ish
		const stores = _.filter(storeList, (store) => {
			let supportedStore = false;
			if (!store.published){
        // Only show results set to published
				return false
			} else {
				_.each(store.supportedCoins, (supportedCoin) => {
					if (supportedCoin === coin.marketCode) {
	          // If the store supports the coin this page is showing
	          // Then include this store in the list
						supportedStore = true;
					}
				});
				if (supportedStore) return store;
			}
		});

		// console.log('supported stores: ', stores);

		let locals = res.locals;
		locals.page.title = `Pay with coin | ${coin.name}`;

    // Bind the coin and supported stores to the page locals
		locals.data = {
			coin,
			stores
		};
		res.render('shopListing');
	}
}
