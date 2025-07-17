module.exports = (req, res, next) => {
	let page = parseInt(req.query.page, 10);
	let limit = parseInt(req.query.limit, 10);

	if (isNaN(page) || page < 1) {
		page = 1;
	}

	if (isNaN(limit) || limit < 1 || limit > 100) {
		limit = 10;
	}

	req.query.page = page;
	req.query.limit = limit;

	next();
};
