exports.buildProductQuery = ({ queryData }) => {
	const { name, category, color, minPrice, maxPrice } = queryData;

	let query = {};

	if (name) {
		query.name = { $regex: name, $options: "i" }; // case-insensitive partial match
	}
	if (category) {
		const categoryArray =
			typeof category === "string"
				? category.split(",").map((id) => id.trim())
				: Array.isArray(category)
					? category
					: [];

		query.categoryId = {
			$in: categoryArray,
		};
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
};

exports.buildOrdersQuery = (queryData) => {
	const userId = queryData;

	let query = {};

	if (userId) {
		query.userId = userId;
	}

	query.status = { $in: ["placed", "completed"] };

	return query;
};
