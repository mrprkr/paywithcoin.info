module.exports = {
	app: {
		port: process.env.PORT || 8081
	},
	db: {
		uri: process.env.MONGO_URI || 'mongodb://localhost/paywithcoin'
	}
}
