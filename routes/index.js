const router = require("express").Router();

router.use("/users", require("./users.route"));

router.use("/category", require("./category.route"));

module.exports = router;
