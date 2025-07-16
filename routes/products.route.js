const authMiddleware = require("../middlewares/auth.middleware");
const createUploadMiddleware = require("../middlewares/uploadFiles.middleware");
const validatorMiddleware = require("../middlewares/validator.middleware");
const { HTTP_ARGS } = require("../constants/general");
const { ALLOWED_IMAGE_TYPES } = require("../constants/filetypes");
const { ProductsController } = require("../controllers");
const { validateProductsRequest } = require("../schemas/productsSchema");
const { validateIdParamsRequest } = require("../schemas/categorySchema");
const catchAsync = require("../utils/asyncCatchUtils");

const router = require("express").Router();

const uploadFiles = createUploadMiddleware({
	allowedTypes: ALLOWED_IMAGE_TYPES,
});

router.post(
	"/",
	authMiddleware,
	uploadFiles.array("files"),
	validatorMiddleware({ validateFunction: validateProductsRequest }),
	catchAsync(ProductsController.createProduct)
);

router.get(
	"/:id",
	authMiddleware,
	validatorMiddleware({
		validateFunction: validateIdParamsRequest,
		reqProperty: HTTP_ARGS.params.value,
	}),
	catchAsync(ProductsController.getProduct)
);

router.get("/", authMiddleware, catchAsync(ProductsController.getAllProducts));

router.patch(
	"/:id",
	authMiddleware,
	uploadFiles.array("files"),
	validatorMiddleware({
		validateFunction: validateIdParamsRequest,
		reqProperty: HTTP_ARGS.params.value,
	}),
	validatorMiddleware({ validateFunction: validateProductsRequest }),
	catchAsync(ProductsController.updateProduct)
);

router.delete(
	"/:id",
	authMiddleware,
	validatorMiddleware({
		validateFunction: validateIdParamsRequest,
		reqProperty: HTTP_ARGS.params.value,
	}),
	catchAsync(ProductsController.deleteProduct)
);

module.exports = router;
