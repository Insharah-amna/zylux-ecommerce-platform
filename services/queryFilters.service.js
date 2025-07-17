const queryFilterServices = {
	buildProductQuery: (queryParams) => {
		const { name, category, color, minPrice, maxPrice } = queryParams;

		const query = {};

		if (name) {
			query.name = { $regex: name, $options: "i" }; // case-insensitive partial match
		}
		if (category) {
			query.category = category;
		}
		if (color) {
			query.colorVariants = { $regex: color, $options: "i" };
		}
		if (minPrice) {
			query.price = { $gte: Number(minPrice) };
		}
		if (maxPrice) {
			query.price = { $lte: Number(maxPrice) };
		}
		if (minPrice && maxPrice) {
			query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
		}

		return query;
	},
};
module.exports = queryFilterServices;
