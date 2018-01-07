const express = require('express');
const pug = require('pug');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const app = express();
const config = require('./config');

// Set application config
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'templates/views'));

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

app.use(express.static(path.join(__dirname, 'public')));

// Require routes
require('./routes/index')(app);


// Listen on specified port
app.listen(config.app.port, () => {
	console.log(`App listening on: ${config.app.port}`);
});
