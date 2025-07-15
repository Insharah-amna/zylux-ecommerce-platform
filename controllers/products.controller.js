const ProductsModel = require("../model/products.model");
const GeneralServices = require("../services/general.service");
const ProductsResponses = require("../factories/responses/products");
const ProductsErrors = require("../factories/errors/products");
const cloudinary = require("../cloudinary");

const ProductsController = {
	createProduct: async (req, res) => {
		const data = req.body;

		const { response: existingProduct } = await GeneralServices.findOne({
			model: ProductsModel,
			query: data,
		});

		if (existingProduct) return ProductsErrors.productAlreadyExistErr({ res });

		if (!req.files) return ProductsErrors.photoUploadErr({ res });

		const files = req.files;

		const results = await Promise.all(
			files.map((file) => {
				return new Promise((resolve, reject) => {
					const stream = cloudinary.uploader.upload_stream(
						{ folder: "products" },
						(error, result) => {
							if (error) reject(error);
							else resolve(result);
						}
					);
					stream.end(file.buffer);
				});
			})
		);

		const imageUrls = results.map((r) => r.secure_url);

		const Data = {
			...req.body,
			imageUrls,
		};

		const { error, doc: newProduct } = await GeneralServices.create({
			model: ProductsModel,
			data: Data,
		});

		if (error) return ProductsErrors.creationFailedErr({ res });

		return ProductsResponses.productCreatedSuccessfully({
			res,
			product: newProduct,
		});
	},
};

module.exports = ProductsController;
