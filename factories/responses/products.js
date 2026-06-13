const ProductsResponses = {
	productCreatedSuccessfully: ({ res }) => {
		return res.status(201).json({
			statusCode: 201,
			message: "Product created successfully",
			body: {},
		});
	},

	photoUploadedSuccessfully: ({ res, req }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "File uploaded successfully",
			filePath: req.files.path,
		});
	},

	productsFetchedSuccessfully: ({ res, products, page, limit, totalPages }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Products retrieved successfully",
			body: { products, pagination: { page, limit, totalPages } },
		});
	},

	productFetchedSuccessfully: ({ res, product }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Product retrieved successfully",
			body: { product },
		});
	},

	productUpdatedSuccessfully: ({ res }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Product updated successfully",
			body: {},
		});
	},

	productDeletedSuccessfully: ({ res }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Product deleted successfully",
			body: {},
		});
	},
};

module.exports = ProductsResponses;
