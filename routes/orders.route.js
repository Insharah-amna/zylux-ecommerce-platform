const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const accessMiddleware = require("../middlewares/access.middleware");
const validatorMiddleware = require("../middlewares/validator.middleware");
const { validateOrderCheckoutRequest } = require("../schemas/ordersSchema");
const catchAsync = require("../utils/asyncCatchUtils");
const OrdersController = require("../controllers/orders.controller");
const verifyStripeWebhookMiddleware = require("../middlewares/verifyStripeWebhook.middleware");
const { ROLES, HTTP_ARGS } = require("../constants/general");
const { validateIdParamsRequest } = require("../schemas/categorySchema");

router.post(
	"/",
	authMiddleware,
	accessMiddleware({ allowedRoles: [ROLES.buyer.value] }),
	validatorMiddleware({
		validateFunction: validateOrderCheckoutRequest,
	}),
	catchAsync(OrdersController.createOrder)
);

router.post(
	"/webhook",
	verifyStripeWebhookMiddleware,
	catchAsync(OrdersController.verifyOrder)
);

router.get(
	"/",
	authMiddleware,
	accessMiddleware({ allowedRoles: [ROLES.admin.value] }),
	catchAsync(OrdersController.getAllOrders)
);

router.get(
	"/:id",
	authMiddleware,
	validatorMiddleware({
		validateFunction: validateIdParamsRequest,
		reqProperty: HTTP_ARGS.params.value,
	}),
	catchAsync(OrdersController.getOrdersById)
);

router.delete(
	"/:id",
	authMiddleware,
	validatorMiddleware({
		validateFunction: validateIdParamsRequest,
		reqProperty: HTTP_ARGS.params.value,
	}),
	catchAsync(OrdersController.deleteOrder)
);

module.exports = router;
