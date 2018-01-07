const mongoose = require('mongoose');

// Define the schema
const CoinSchema = mongoose.Schema({
  name: String,
	description: String,
	url: String,
	image: {
		alt: String,
		url: String
	},
});

// Register and make it avaliable to the app
const Store = mongoose.model('Coin', CoinSchema);
module.exports = Store;
