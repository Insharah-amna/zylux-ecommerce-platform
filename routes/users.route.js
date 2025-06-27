const router = require("express").Router();
const { UsersController } = require("../controllers");
const validatorMiddleware = require("../middlewares/validator.middleware");
const catchAsync = require("../utils/asyncCatchUtils");
const {
	validateCreateUserRequest,
	validateLoginRequest,
	validateForgotPasswordRequest,
	validateResetPasswordRequest,
	validateTokenParamsRequest,
} = require("../schemas/userSchema");

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

module.exports = router;
