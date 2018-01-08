// Helper function to automate adding data/coins to db
const _ = require('underscore');
const mongoose = require('mongoose');
const Coin = require('../models/coin');
const coins = require('requiredir')('../data/coins').toArray();
const config = require('../config.js');

// Connect to the DB
mongoose.connect(config.db.uri, { useMongoClient: true });
mongoose.Promise = global.Promise;

// Itterate over items in the folder and add them to MDB
_.each(coins, (coin) => {
	const newCoin = new Coin(coin);
	newCoin.save((err, result) => {
		if(err) console.error(err);
		else console.log(result);
	});
});
