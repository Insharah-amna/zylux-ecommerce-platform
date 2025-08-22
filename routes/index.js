const router = require("express").Router();

router.use("/users", require("./users.route"));

router.use("/categories", require("./categories.route"));

router.use("/products", require("./products.route"));

router.use("/orders", require("./orders.route"));

router.use("/wishlist", require("./wishlist.route"));

router.use("/review", require("./review.route"));

module.exports = router;
