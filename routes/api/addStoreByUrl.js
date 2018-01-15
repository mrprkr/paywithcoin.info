const ogs = require('open-graph-scraper');
const mongoose = require('mongoose');
const Store = mongoose.model('Store')

module.exports = (req, res) => {
	if (req.query.url) {
    // If the URL is provided
		Store.find({url: req.query.url}).exec((err, results) => {
			if(results.length){
        // IF the URL provided is already stored
				res.json({message: 'URL already submitted'})
			} else {
        // Get the metadata for the supplied URL
				const options = {'url': req.query.url};
				ogs(options)
			  .then(function (result) {
          // Store the returned data
					const newStore = new Store({
						name: result.query.url,
						title: result.data.ogTitle || '',
						description: result.data.ogDescription || '',
						url: req.query.url,
						published: true,
						verified: false,
						twitter: result.data.twitterSite || '',
						image: {
							url: result.data.ogImage.url || ''
						}
					});

		      // Save the store to the DB
					newStore.save((err, result) => {
            // Return the resulting entry
						res.json(result);
					});
			  })
			  .catch(function (error) {
          // Catch any errors
			    console.log('error:', error);
					res.status(500).json({code: 500, message: 'Server encountered a problem'});
			  });
			}
		})
	} else {
		res.status(400).json({code: 400, message: 'Missing URL parameter'});
	}
}
