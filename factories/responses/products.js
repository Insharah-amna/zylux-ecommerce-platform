const ProductsResponses = {
	productCreatedSuccessfully: ({ res, category }) => {
		return res.status(201).json({
			statusCode: 201,
			message: "Product created successfully",
			body: { category },
		});
	},

	photoUploadedSuccessfully: ({ res, req }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "File uploaded successfully",
			filePath: req.files.path,
		});
	},
};

module.exports = ProductsResponses;
