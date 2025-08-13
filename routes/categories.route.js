const { HTTP_ARGS } = require("../constants/general");
const CategoriesController = require("../controllers/category.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const validatorMiddleware = require("../middlewares/validator.middleware");
const {
	validateCategoryRequest,
	validateIdParamsRequest,
} = require("../schemas/categorySchema");
const catchAsync = require("../utils/asyncCatchUtils");

const router = require("express").Router();

router.post(
	"/",
	authMiddleware,
	validatorMiddleware({ validateFunction: validateCategoryRequest }),
	catchAsync(CategoriesController.createCategory)
);

router.get(
	"/:id",
	authMiddleware,
	validatorMiddleware({
		validateFunction: validateIdParamsRequest,
		reqProperty: HTTP_ARGS.params.value,
	}),
	catchAsync(CategoriesController.getCategory)
);

router.get("/", catchAsync(CategoriesController.getCategories));

router.patch(
	"/:id",
	authMiddleware,
	validatorMiddleware({
		validateFunction: validateIdParamsRequest,
		reqProperty: HTTP_ARGS.params.value,
	}),
	catchAsync(CategoriesController.updateCategory)
);

router.delete(
	"/:id",
	authMiddleware,
	validatorMiddleware({
		validateFunction: validateIdParamsRequest,
		reqProperty: HTTP_ARGS.params.value,
	}),
	catchAsync(CategoriesController.deleteCategory)
);

module.exports = router;
