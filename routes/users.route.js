const router = require("express").Router();
const { UsersController } = require("../controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const accessMiddleware = require("../middlewares/access.middleware");
const validatorMiddleware = require("../middlewares/validator.middleware");
const catchAsync = require("../utils/asyncCatchUtils");
const {
	validateCreateUserRequest,
	validateLoginRequest,
	validateForgotPasswordRequest,
	validateResetPasswordRequest,
	validateTokenParamsRequest,
	validateResendVerificationEmailReq,
	validateUpdateUserProfileReq,
} = require("../schemas/userSchema");
const { ROLES } = require("../constants/general");
const createUploadMiddleware = require("../middlewares/uploadFiles.middleware");
const { ALLOWED_IMAGE_TYPES } = require("../constants/filetypes");

const uploadFile = createUploadMiddleware({
	allowedTypes: ALLOWED_IMAGE_TYPES,
});

router.get("/me", authMiddleware, catchAsync(UsersController.getProfile));

router.post(
	"/signup",
	validatorMiddleware({ validateFunction: validateCreateUserRequest }),
	catchAsync(UsersController.signupUser)
);

router.post(
	"/login",
	validatorMiddleware({ validateFunction: validateLoginRequest }),
	catchAsync(UsersController.loginUser)
);

router.post(
	"/forgot-password",
	validatorMiddleware({ validateFunction: validateForgotPasswordRequest }),
	catchAsync(UsersController.forgotPassword)
);

router.patch(
	"/reset-password/:token",
	validatorMiddleware({
		validateFunction: validateTokenParamsRequest,
		reqProperty: "params",
	}),
	validatorMiddleware({ validateFunction: validateResetPasswordRequest }),
	catchAsync(UsersController.resetPassword)
);

router.patch(
	"/verify-email/:token",
	validatorMiddleware({
		validateFunction: validateTokenParamsRequest,
		reqProperty: "params",
	}),
	catchAsync(UsersController.verifyEmail)
);

router.get(
	"/resend-email-verification/:email",
	validatorMiddleware({
		validateFunction: validateResendVerificationEmailReq,
		reqProperty: "params",
	}),
	catchAsync(UsersController.resendVerificationEmail)
);

router.patch(
	"/updateProfile",
	authMiddleware,
	accessMiddleware({ allowedRoles: [ROLES.buyer.value] }),
	uploadFile.single("file"),
	catchAsync(UsersController.updateUserProfile)
);

module.exports = router;
