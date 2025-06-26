const router = require("express").Router();
const { UsersController } = require("../controllers");
const catchAsync = require("../utils/asyncCatchUtils");

router.post("/signup", catchAsync(UsersController.signupUser));
router.get("/login", catchAsync(UsersController.loginUser));

module.exports = router;
