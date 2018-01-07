const _ = require('underscore');
const path = require('path');
const requireDir = require('requiredir');
const coins = requireDir(path.join(__dirname, '../../data/coins')).toArray();

module.exports = (req, res) => {
  // Filter the coin list to the matching marketCode
	const matchingCoins = _.where(coins, {marketCode: req.params.coin});
	const coin = matchingCoins[0]; // There should only be 1 match

	if(!coin){
    // If the coin does not exist in the data set
		res.render('error', {error: {message:`The coin ${req.params.coin} does not exist`, code: 404}});
	} else {
		let locals = res.locals;
		locals.page.title = `Pay with coin | ${coin.name}`;
		locals.data = {
			coin
		};
		res.render('shopListing');
	}
}
