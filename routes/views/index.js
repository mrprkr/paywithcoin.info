const mongoose = require('mongoose');
const Coin = mongoose.model('Coin');

// const path = require('path');
// const requireDir = require('requiredir');
// const coins = requireDir(path.join(__dirname, '../../data/coins')).toArray();

module.exports = (req, res) => {
	Coin.find({published: true}).exec((err, coins) => {
		if(err) console.error(err);
		else {
			res.locals.data = {
				coins,
			}
			res.render('index');
		}
	});

}
