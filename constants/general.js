module.exports.HTTP_ARGS = {
	params: {
		value: "params",
	},
	query: {
		value: "query",
	},
	body: {
		value: "body",
	},
};

module.exports.GetPaginationSkip = ({ page = 1, limit = 1 }) => ({
	skip: (page - 1) * limit,
});
