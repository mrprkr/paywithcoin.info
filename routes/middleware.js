exports = module.exports;

exports.initLocals = (req, res, next) => {
	res.locals = {};
	res.locals.page = {};
	next();
}
