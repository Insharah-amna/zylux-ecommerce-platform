const CategoryResponses = {
	categoryCreatedSuccessfully: ({ res, category }) => {
		return res.status(201).json({
			statusCode: 201,
			message: "Category created successfully",
			body: { category },
		});
	},

	categoryFetchedSuccessfully: ({ res, category }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Data fetched successfully",
			body: { category },
		});
	},

	categoriesFetchedSuccessfully: ({ res, categories }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Data fetched successfully",
			body: { categories },
		});
	},

	categoryUpdatedSuccessfully: ({ res }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Category updated successfully",
			body: {},
		});
	},

	categoryDeletedSuccessfully: ({ res }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Category deleted successfully",
			body: {},
		});
	},
};

module.exports = CategoryResponses;
