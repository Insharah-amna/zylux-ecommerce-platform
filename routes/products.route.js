const { ProductsController } = require("../controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const createUploadMiddleware = require("../middlewares/uploadFiles.middleware");
const validatorMiddleware = require("../middlewares/validator.middleware");
const { ALLOWED_IMAGE_TYPES } = require("../constants/filetypes");
const { validateProductsRequest } = require("../schemas/productsSchema");
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

router.get("/", authMiddleware, catchAsync(ProductsController.getAllProducts));

module.exports = router;
