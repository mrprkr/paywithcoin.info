const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const StoreSchema = mongoose.Schema({
  name: String,
  title: String,
	description: String,
	url: String,
  twitter: String,
	image: {
		alt: String,
		url: String
	},
	coins: [{ type: Schema.Types.ObjectId, ref: 'Coin' }],
  published: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  _createdAt: {type: Date, default: Date.now()}
});

// Register and make it avaliable to the app
const Store = mongoose.model('Store', StoreSchema);
module.exports = Store;
