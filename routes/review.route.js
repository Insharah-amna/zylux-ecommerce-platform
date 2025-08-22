const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const accessMiddleware = require("../middlewares/access.middleware");
const validatorMiddleware = require("../middlewares/validator.middleware");
const {
	validateAddReviewRequest,
	validateProductIdParamsRequest,
} = require("../schemas/reviewSchema");
const catchAsync = require("../utils/asyncCatchUtils");
const ReviewController = require("../controllers/review.controller");
const { validateIdParamsRequest } = require("../schemas/categorySchema");
const { ROLES, HTTP_ARGS } = require("../constants/general");

router.post(
	"/",
	authMiddleware,
	accessMiddleware({ allowedRoles: [ROLES.buyer.value] }),
	validatorMiddleware({
		validateFunction: validateAddReviewRequest,
	}),
	catchAsync(ReviewController.addReview)
);

router.get(
	"/:productId",
	validatorMiddleware({
		validateFunction: validateProductIdParamsRequest,
		reqProperty: HTTP_ARGS.params.value,
	}),
	catchAsync(ReviewController.fetchReviewsByProductId)
);

router.get(
	"/",
	authMiddleware,
	accessMiddleware({ allowedRoles: [ROLES.admin.value] }),
	catchAsync(ReviewController.fetchAllReviews)
);

router.delete(
	"/:id",
	authMiddleware,
	validatorMiddleware({
		validateFunction: validateIdParamsRequest,
		reqProperty: HTTP_ARGS.params.value,
	}),
	catchAsync(ReviewController.deleteReviews)
);

module.exports = router;
