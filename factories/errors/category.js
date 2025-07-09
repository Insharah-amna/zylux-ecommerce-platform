const CategoryErrors = {
	creationFailedErr: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "Creation failed",
		});
	},

	categoryAlreadyExistErr: ({ res }) => {
		return res.status(409).json({
			statusCode: 409,
			message: "Category already exists",
		});
	},

	categoryNotFound: ({ res }) => {
		return res.status(404).json({
			statusCode: 404,
			message: "Category not found",
		});
	},

	fetchFailedErr: ({ res }) => {
		return res.status(404).json({
			statusCode: 404,
			message: "Category not found",
		});
	},

	updationFailedErr: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "Updation failed",
		});
	},

	deletionFailedErr: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "Deletion failed",
		});
	},
};

module.exports = CategoryErrors;
