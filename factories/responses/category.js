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

	categoryUpdatedSuccessfully: ({ res, category }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Category updated successfully",
			body: { category },
		});
	},

	categoryDeletedSuccessfully: ({ res, category }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Category deleted successfully",
			body: { category },
		});
	},
};

module.exports = CategoryResponses;
