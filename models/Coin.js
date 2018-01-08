const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const CoinSchema = mongoose.Schema({
  name: String,
	description: String,
  marketCode: String,
	url: String,
	image: {
		alt: String,
		url: String
	},
});

// Register and make it avaliable to the app
const Coin = mongoose.model('Coin', CoinSchema);
module.exports = Coin;
