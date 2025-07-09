const GeneralServices = require("../services/general.service");
const CategoryResponses = require("../factories/responses/category");
const CategoryErrors = require("../factories/errors/category");
const CategoriesModel = require("../model/categories.model");

const CategoriesController = {
	createCategory: async (req, res) => {
		const data = req.body;

		const { response } = await GeneralServices.findOne({
			model: CategoriesModel,
			query: data,
		});

		if (response) return CategoryErrors.categoryAlreadyExistErr({ res });

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

		const { error, response: category } = await GeneralServices.findById({
			model: CategoriesModel,
			id,
		});

		if (error) return CategoryErrors.fetchFailedErr({ res });

		return CategoryResponses.categoryFetchedSuccessfully({ res, category });
	},

	getCategories: async (req, res) => {
		const { error, response: category } = await GeneralServices.find({
			model: CategoriesModel,
		});

		if (error) return CategoryErrors.fetchFailedErr({ res });

		return CategoryResponses.categoryFetchedSuccessfully({ res, category });
	},

	updateCategory: async (req, res) => {
		const { id } = req.params;
		const data = req.body;

		const { error } = await GeneralServices.findByIdAndUpdate({
			model: CategoriesModel,
			data,
			id,
		});

		if (error) return CategoryErrors.updationFailedErr({ res });

		return CategoryResponses.categoryUpdatedSuccessfully({
			res,
			category: data,
		});
	},

	deleteCategory: async (req, res) => {
		const data = req.body;

		const { response: category, error: notFoundErr } =
			await GeneralServices.findOne({
				model: CategoriesModel,
				query: data,
			});

		if (notFoundErr) return CategoryErrors.categoryNotFound({ res });

		const { error } = await GeneralServices.findByIdAndDelete({
			model: CategoriesModel,
			id: category._id,
		});

		if (error) return CategoryErrors.deletionFailedErr({ res });

		return CategoryResponses.categoryDeletedSuccessfully({
			res,
			category,
		});
	},
};

module.exports = CategoriesController;
