const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const validatorMiddleware = require("../middlewares/validator.middleware");
const { validateMessageRequest } = require("../schemas/messagesSchema");
const { validateIdParamsRequest } = require("../schemas/categorySchema");
const { HTTP_ARGS } = require("../constants/general");
const catchAsync = require("../utils/asyncCatchUtils");
const { MessagesController } = require("../controllers");

router.post(
	"/",
	authMiddleware,
	validatorMiddleware({
		validateFunction: validateMessageRequest,
	}),
	catchAsync(MessagesController.sendMessage)
);

router.get(
	"/:id",
	authMiddleware,
	validatorMiddleware({
		validateFunction: validateIdParamsRequest,
		reqProperty: HTTP_ARGS.params.value,
	}),
	catchAsync(MessagesController.getMessageByUserId)
);

router.get(
	"/",
	authMiddleware,
	catchAsync(MessagesController.getDistinctUsers)
);

module.exports = router;
