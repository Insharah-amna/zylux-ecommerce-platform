const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const accessMiddleware = require("../middlewares/access.middleware");
const validatorMiddleware = require("../middlewares/validator.middleware");
const { validateIdParamsRequest } = require("../schemas/categorySchema");
const catchAsync = require("../utils/asyncCatchUtils");
const WishlistController = require("../controllers/wishlist.controller");
const { HTTP_ARGS } = require("../constants/general");
const { ROLES } = require("../constants/general");

router.post(
	"/:id",
	authMiddleware,
	accessMiddleware({ allowedRoles: [ROLES.buyer.value] }),
	validatorMiddleware({
		validateFunction: validateIdParamsRequest,
		reqProperty: HTTP_ARGS.params.value,
	}),
	catchAsync(WishlistController.addToWishlist)
);

router.get(
	"/",
	authMiddleware,
	accessMiddleware({ allowedRoles: [ROLES.buyer.value] }),
	catchAsync(WishlistController.getWishlist)
);

router.delete(
	"/:id",
	authMiddleware,
	accessMiddleware({ allowedRoles: [ROLES.buyer.value] }),
	catchAsync(WishlistController.removeFromWishlist)
);

module.exports = router;
