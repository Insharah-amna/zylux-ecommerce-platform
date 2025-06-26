const router = require("express").Router();
const { UsersController } = require("../controllers");
const validatorMiddleware = require("../middlewares/validator.middleware");
const {
	validateCreateUserRequest,
	validateLoginRequest,
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

module.exports = router;
