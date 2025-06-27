const router = require("express").Router();
const { UsersController } = require("../controllers");
const validatorMiddleware = require("../middlewares/validator.middleware");
const {
	validateCreateUserRequest,
	validateLoginRequest,
	validateForgotPasswordRequest,
} = require("../schemas/userSchema");
const catchAsync = require("../utils/asyncCatchUtils");

router.post(
	"/signup",
	validatorMiddleware({ validateFunction: validateCreateUserRequest }),
	catchAsync(UsersController.signupUser)
);

router.get(
	"/login",
	validatorMiddleware({ validateFunction: validateLoginRequest }),
	catchAsync(UsersController.loginUser)
);

router.get(
	"/forgot-password",
	validatorMiddleware({ validateFunction: validateForgotPasswordRequest }),
	catchAsync(UsersController.forgotPassword)
);

module.exports = router;
