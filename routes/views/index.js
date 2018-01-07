const path = require('path');
const requireDir = require('requiredir');
const coins = requireDir(path.join(__dirname, '../../data/coins')).toArray();

module.exports = (req, res) => {
	res.locals.data = {
		coins,
	}
	res.render('index');
}
