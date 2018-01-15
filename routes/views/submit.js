const mongoose = require('mongoose');
const Coin = mongoose.model('Coin');
const Store = mongoose.model('Store');
const ogs = require('open-graph-scraper');


exports = module.exports;

// Load the page on GET
exports.getSubmitPage = (req, res) => {
	let locals = res.locals;

  // Bind the coins to locals to help with the form submission
	Coin.find({published: true}).exec((err, coins) => {
		if (err) throw new Error(err);
		else {
			locals.data = {
				coins
			}
			res.render('submit');
		}
	});
}

// Handle the form on POST
exports.handleSubmitForm = (req, res) => {
	let locals = res.locals;
	// console.log(req);

	if(!req.body.name || !req.body.url || !req.body.coins){
		locals.data = {
			alert: {
				type: 'warning',
				message: 'Missing fields'
			}
		}
		res.render('submit');
	} else {
		Store.find({url: req.body.url}).exec((err, results) => {
			if(results.length){
				// IF the URL provided is already stored
				locals.data = {
					alert: {
						type: 'warning',
						message: 'URL has already been submitted'
					}
				}
				res.render('submit');
			} else {
				// Get the metadata for the supplied URL
				const options = {'url': req.body.url, 'timeout': 4000};
				ogs(options)
					.then(function (result) {
						// Store the returned data
						let ogImage = '';
						const isUrl = new RegExp(/^https?:\/\//, 'i');

	          // Only assign an image if it's hosted/absolute URL
						if(result.data.ogImage.url.match(isUrl)){
							ogImage = result.data.ogImage.url;
						}

						let formattedUrl = '';
						if(req.body.url.match(isUrl)){
							formattedUrl = req.body.url
						} else {
	            // TODO test for https;
							formattedUrl = 'http://' + req.body.url;
						}

						console.log(req.body);
	          // Split the coins into an array
						// Not sure if this is needed
						let coins = [];
						if(req.body.coins.length == 1){
							coins.push(req.body.coins)
							// coins = Array.from(req.body.coins);
						} else {
							coins = req.body.coins;
						}

						const newStore = new Store({
							name: req.body.name,
							title: result.data.ogTitle || '',
							description: result.data.ogDescription || '',
							url: formattedUrl,
							twitter: result.data.twitterSite || '',
							coins,
							image: {
								url: ogImage,
								alt: req.body.name + ' logo'
							}
						})

						// Save the store to the DB
						newStore.save((err, result) => {
							if(err){
								console.error(err);
							}
							// Return the resulting entry
							locals.data = {
								alert: {
									type: 'success',
									message: 'URL has been submitted successfully'
								}
							}
							console.log(result);
							res.render('submit');
						});

					})
					.catch(function (error) {
						// Catch any errors
						console.log('error:', error);
						locals.data = {
							alert: {
								type: 'danger',
								message: 'Error submitting URL'
							}
						}
						res.render('submit')
						// res.status(500).json({code: 500, message: 'Server encountered a problem'});
					});
			}
		});
	}
}
