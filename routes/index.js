const router = require("express").Router();

router.use("/users", require("./users.route"));

router.use("/categories", require("./categories.route"));

module.exports = router;
