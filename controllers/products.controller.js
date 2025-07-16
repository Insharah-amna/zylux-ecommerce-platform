const ProductsModel = require("../model/products.model");
const GeneralServices = require("../services/general.service");
const ProductsResponses = require("../factories/responses/products");
const ProductsErrors = require("../factories/errors/products");
const CloudinaryService = require("../services/cloudinary.service");

const ProductsController = {
	createProduct: async (req, res) => {
		let data = req.body;

		if (!req.files) return ProductsErrors.photoUploadErr({ res });

		const { urls, error: imagesUploadErr } =
			await CloudinaryService.uploadMultipleFile({
				files: req.files,
				folder: "products",
			});

		data.imageUrls = urls;

		const { error, doc: newProduct } = await GeneralServices.create({
			model: ProductsModel,
			data,
		});

		if (error) return ProductsErrors.creationFailedErr({ res });

		return ProductsResponses.productCreatedSuccessfully({
			res,
			product: newProduct,
		});
	},
};

module.exports = ProductsController;
