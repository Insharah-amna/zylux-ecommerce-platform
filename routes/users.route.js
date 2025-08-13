const router = require("express").Router();
const { UsersController } = require("../controllers");
const validatorMiddleware = require("../middlewares/validator.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const catchAsync = require("../utils/asyncCatchUtils");
const {
	validateCreateUserRequest,
	validateLoginRequest,
	validateForgotPasswordRequest,
	validateResetPasswordRequest,
	validateTokenParamsRequest,
	validateResendVerificationEmailReq,
} = require("../schemas/userSchema");

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

module.exports = router;
