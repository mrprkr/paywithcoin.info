const path = require('path')
const Coin = require('requiredir')(path.resolve(__dirname, '../data/coins')).toArray();

// Export an object of data models to inject to the database on init
module.exports = {
	Coin
}
