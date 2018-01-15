module.exports = {
	app: {
		port: process.env.PORT || 8081
	},
	db: {
		uri: process.env.MONGODB_URI || 'mongodb://localhost/paywithcoin'
	},
	elasticsearch: {
		url: process.env.BONSAI_URL || 'localhost:9200/paywithcoin'
	}
}
