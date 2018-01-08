const ogs = require('open-graph-scraper');

module.exports = (req, res) => {
	if (req.query.url) {
		const options = {'url': req.query.url};
		ogs(options)
	  .then(function (result) {
	    // console.log('result:', result);
			res.json(result)
	  })
	  .catch(function (error) {
	    console.log('error:', error);
			res.status(500).json({code: 500, message: 'Server encountered a problem'});
	  });
	} else {
		res.status(400).json({code: 400, message: 'Missing URL parameter'});
	}
}
