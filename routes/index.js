const router = require("express").Router();

router.use("/users", require("./users.route"));

router.use("/categories", require("./categories.route"));

router.use("/products", require("./products.route"));

module.exports = router;
