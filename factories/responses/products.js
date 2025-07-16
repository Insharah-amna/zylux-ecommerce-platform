const ProductsResponses = {
	productCreatedSuccessfully: ({ res, product }) => {
		return res.status(201).json({
			statusCode: 201,
			message: "Product created successfully",
			body: { product },
		});
	},

	photoUploadedSuccessfully: ({ res, req }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "File uploaded successfully",
			filePath: req.files.path,
		});
	},

	productsFetchedSuccesfully: ({ res, products }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Data fetched successfully",
			body: { products },
		});
	},

	productFetchedSuccesfully: ({ res, product }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Data fetched successfully",
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
};

module.exports = ProductsResponses;
