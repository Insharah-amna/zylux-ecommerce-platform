const ProductsErrors = {
	creationFailedErr: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "Creation failed",
		});
	},

	productAlreadyExistErr: ({ res }) => {
		return res.status(409).json({
			statusCode: 409,
			message: "Product already exists",
		});
	},

	imageUploadErr: ({ res }) => {
		return res.status(409).json({
			statusCode: 409,
			message: "No file uploaded",
		});
	},

	productNotFound: ({ res }) => {
		return res.status(404).json({
			statusCode: 404,
			message: "Product not found",
		});
	},

	updationFailedErr: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "Failed to update product",
		});
	},

	deletionFailedErr: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "Failed to delete product",
		});
	},
};

module.exports = ProductsErrors;
