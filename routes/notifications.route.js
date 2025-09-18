const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const accessMiddleware = require("../middlewares/access.middleware");
const validatorMiddleware = require("../middlewares/validator.middleware");
const {
	validateNotificationRequest,
} = require("../schemas/notificationSchema");
const { ROLES } = require("../constants/general");
const catchAsync = require("../utils/asyncCatchUtils");
const { NotificationsController } = require("../controllers");

router.post(
	"/",
	authMiddleware,
	validatorMiddleware({
		validateFunction: validateNotificationRequest,
	}),
	catchAsync(NotificationsController.sendNotification)
);

router.get(
	"/",
	authMiddleware,
	accessMiddleware({ allowedRoles: [ROLES.admin.value] }),
	catchAsync(NotificationsController.getNotifications)
);

router.patch(
	"/",
	authMiddleware,
	accessMiddleware({ allowedRoles: [ROLES.admin.value] }),
	catchAsync(NotificationsController.updateNotifications)
);

module.exports = router;
