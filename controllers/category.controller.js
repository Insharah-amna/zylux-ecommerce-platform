const GeneralServices = require("../services/general.service");
const CategoryResponses = require("../factories/responses/category");
const CategoryErrors = require("../factories/errors/category");
const CategoriesModel = require("../model/categories.model");
const { GetPaginationSkip } = require("../constants/general");
const { buildProductQuery } = require("../utils/buildQueryUtils");

const CategoriesController = {
	createCategory: async (req, res) => {
		const data = req.body;

		const { response: existingCategory } = await GeneralServices.findOne({
			model: CategoriesModel,
			query: data,
		});

		if (existingCategory)
			return CategoryErrors.categoryAlreadyExistErr({ res });

		const { error, doc: newCategory } = await GeneralServices.create({
			model: CategoriesModel,
			data,
		});

		if (error) return CategoryErrors.creationFailedErr({ res });

		return CategoryResponses.categoryCreatedSuccessfully({
			res,
			category: newCategory,
		});
	},

	getCategory: async (req, res) => {
		const { id } = req.params;

		const { error, response: existedCategory } = await GeneralServices.findById(
			{
				model: CategoriesModel,
				id,
			}
		);

		if (error) return CategoryErrors.categoryNotFound({ res });

		return CategoryResponses.categoryFetchedSuccessfully({
			res,
			category: existedCategory,
		});
	},

	getCategories: async (req, res) => {
		const { error, response: categories } = await GeneralServices.find({
			model: CategoriesModel,
			options: {
				queryProperties: {
					sort: { createdAt: -1 },
				},
			},
		});

		if (error || categories.length === 0)
			return CategoryErrors.categoryNotFound({ res });

		return CategoryResponses.categoriesFetchedSuccessfully({
			res,
			categories,
		});
	},

	updateCategory: async (req, res) => {
		const { id } = req.params;
		const data = req.body;

		const { error, updatedDoc: updatedCategory } =
			await GeneralServices.findByIdAndUpdate({
				model: CategoriesModel,
				data,
				id,
			});

		if (error || !updatedCategory)
			return CategoryErrors.updationFailedErr({ res });

		return CategoryResponses.categoryUpdatedSuccessfully({ res });
	},

	deleteCategory: async (req, res) => {
		const { id } = req.params;

		const { error } = await GeneralServices.findByIdAndDelete({
			model: CategoriesModel,
			id,
		});

		if (error) return CategoryErrors.deletionFailedErr({ res });

		return CategoryResponses.categoryDeletedSuccessfully({ res });
	},
};

module.exports = CategoriesController;
