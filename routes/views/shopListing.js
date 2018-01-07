module.exports = (req, res) => {
	let locals = res.locals;
	locals.page.title = `Pay with ${req.params.coin} coin`;
	locals.data = {
		coin: req.params.coin
	};
	res.render('shopListing');
}
