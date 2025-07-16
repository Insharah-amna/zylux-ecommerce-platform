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

	getAllProducts: async (req, res) => {
		const { error, response: products } = await GeneralServices.findAll({
			model: ProductsModel,
		});

		if (error) return ProductsErrors.productNotFound({ res });

		return ProductsResponses.productsFetchedSuccesfully({ res, products });
	},

	getProduct: async (req, res) => {
		const { id } = req.params;

		const { error, response: product } = await GeneralServices.findById({
			model: ProductsModel,
			id,
		});

		if (error) return ProductsErrors.productNotFound({ res });

		return ProductsResponses.productFetchedSuccesfully({
			res,
			product,
		});
	},

	updateProduct: async (req, res) => {
		const { id } = req.params;
		const data = req.body;

		const { error, updatedDoc: updatedProduct } =
			await GeneralServices.findByIdAndUpdate({
				model: ProductsModel,
				data,
				id,
			});

		if (error || !updatedProduct)
			return ProductsErrors.updationFailedErr({ res });

		return ProductsResponses.productUpdatedSuccessfully({ res });
	},
};

module.exports = ProductsController;
