const mongoose = require('mongoose');

// Define the schema
const StoreSchema = mongoose.Schema({
  name: String,
	description: String,
	url: String,
	image: {
		alt: String,
		url: String
	},
	coins: [{ type: ObjectId, ref: 'Coin' }]
});

// Register and make it avaliable to the app
const Store = mongoose.model('Store', StoreSchema);
module.exports = Store;
