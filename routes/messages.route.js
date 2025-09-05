const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const validatorMiddleware = require("../middlewares/validator.middleware");
const { validateMessageRequest } = require("../schemas/messagesSchema");
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
	"/",
	authMiddleware,
	catchAsync(MessagesController.getMessageByUserId)
);

module.exports = router;
