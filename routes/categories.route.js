const CategoriesController = require("../controllers/category.controller");
const validatorMiddleware = require("../middlewares/validator.middleware");
const {
	validateCategoryRequest,
	validateIdParamsRequest,
} = require("../schemas/categorySchema");
const catchAsync = require("../utils/asyncCatchUtils");

const router = require("express").Router();

router.post(
	"/",
	validatorMiddleware({ validateFunction: validateCategoryRequest }),
	catchAsync(CategoriesController.createCategory)
);

router.get(
	"/:id",
	validatorMiddleware({
		validateFunction: validateIdParamsRequest,
		reqProperty: "params",
	}),
	catchAsync(CategoriesController.getCategory)
);

router.get("/", catchAsync(CategoriesController.getCategories));

router.patch(
	"/:id",
	validatorMiddleware({
		validateFunction: validateIdParamsRequest,
		reqProperty: "params",
	}),
	catchAsync(CategoriesController.updateCategory)
);

router.delete(
	"/:id",
	validatorMiddleware({
		validateFunction: validateIdParamsRequest,
		reqProperty: "params",
	}),
	catchAsync(CategoriesController.deleteCategory)
);

module.exports = router;
