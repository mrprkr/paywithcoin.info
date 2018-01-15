require('dotenv').config();
const express = require('express');
const pug = require('pug');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const mongoose = require('mongoose');

// Connect to the DB
mongoose.connect(config.db.uri, { useMongoClient: true });
mongoose.Promise = global.Promise;

// Set application config
app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './templates/views'));

// Compile sass on-the-fly
// TODO: migrate this to webpack if/when Javascript is needed
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'src/styles'),
    dest: path.join(__dirname, 'public/css'),
    debug: process.env.NODE_ENV !== 'production',
    outputStyle: 'compressed',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

// Parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server the public folder staticly
app.use(express.static(path.join(__dirname, 'public')));

// Require models
require('requiredir')('models');

// Require routes
require('./routes/index')(app);

// Run the updater
require('./updater');

// Listen on specified port
app.listen(config.app.port, () => {
	console.log(`App listening on: ${config.app.port}`);
});
