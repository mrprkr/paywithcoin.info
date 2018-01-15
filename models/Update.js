const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const UpdateSchema = mongoose.Schema({
  name: String,
	version: String
});

// Register and make it avaliable to the app
const Update = mongoose.model('Update', UpdateSchema);
module.exports = Update;
