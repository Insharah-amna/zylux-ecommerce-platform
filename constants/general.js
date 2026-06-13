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

module.exports.ROLES = {
	admin: {
		value: "admin",
	},
	buyer: {
		value: "buyer",
	},
};

module.exports.DEFAULT_PROFILE_IMAGE =
	"https://res.cloudinary.com/dk0dbpfoh/image/upload/v1756305008/profile_placeholder_ulp6ih.webp";
