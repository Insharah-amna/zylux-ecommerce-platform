const ProductsModel = require("../model/products.model");
const GeneralServices = require("../services/general.service");
const ProductsResponses = require("../factories/responses/products");
const ProductsErrors = require("../factories/errors/products");
const CloudinaryService = require("../services/cloudinary.service");
const { GetPaginationSkip } = require("../constants/general");
const {
	buildProductQuery,
	getSortedDocuments,
} = require("../utils/buildQueryUtils");

const ProductsController = {
	createProduct: async (req, res) => {
		let data = req.body;

		if (!req.files) return ProductsErrors.photoUploadErr({ res });

		const { urls, error: imagesUploadErr } =
			await CloudinaryService.uploadMultipleFile({
				files: req.files,
				folder: "products",
			});

		if (imagesUploadErr) return ProductsErrors.imageUploadErr({ res });

		data.imageUrls = urls;

		const { error, doc: newProduct } = await GeneralServices.create({
			model: ProductsModel,
			data,
		});

		if (error) return ProductsErrors.creationFailedErr({ res });

		return ProductsResponses.productCreatedSuccessfully({ res });
	},

	getAllProducts: async (req, res) => {
		const { page, limit, sortBy } = req.query;

		const { skip } = GetPaginationSkip({ page, limit });

		const query = buildProductQuery({ queryData: req.query });

		const sortOption = getSortedDocuments({ sortBy });

		const { count } = await GeneralServices.countDocuments({
			model: ProductsModel,
			query,
		});

		const { error, response: products } = await GeneralServices.find({
			model: ProductsModel,
			query,
			options: {
				populatedFields: "categoryId",
				queryProperties: {
					limit,
					skip,
					sort: sortOption,
				},
			},
		});

		return ProductsResponses.productsFetchedSuccessfully({
			res,
			products,
			page,
			limit,
			totalPages: Math.ceil(count / limit),
		});
	},

	getProduct: async (req, res) => {
		const { id } = req.params;

		const { error, response: product } = await GeneralServices.findById({
			model: ProductsModel,
			id,
			options: { populatedFields: "categoryId" },
		});

		if (error || !product) return ProductsErrors.productNotFound({ res });

		return ProductsResponses.productFetchedSuccessfully({
			res,
			product,
		});
	},

	updateProduct: async (req, res) => {
		const { id } = req.params;
		let data = req.body;

		if (req.files.length > 0) {
			const { urls: newUrls, error: imagesUploadErr } =
				await CloudinaryService.uploadMultipleFile({
					files: req.files,
					folder: "products",
				});

			if (imagesUploadErr) return ProductsErrors.imageUploadErr({ res });

			data.imageUrls = [...(data.imageUrls || []), ...newUrls];
		}

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

	deleteProduct: async (req, res) => {
		const { id } = req.params;

		const { error } = await GeneralServices.findByIdAndDelete({
			model: ProductsModel,
			id,
		});

		if (error) return ProductsErrors.deletionFailedErr({ res });

		return ProductsResponses.productDeletedSuccessfully({ res });
	},
};

module.exports = ProductsController;
