const path = require('path')
const Coin = require('requiredir')(path.resolve(__dirname, '../data/coins')).toArray();

// Export an object of data models to inject to the database on init

/*
FORMAT:
	module.exports = {
		Model: [docs]
	}
*/

// For now this is limited to 1 model / update file

module.exports = {
	Coin
}
