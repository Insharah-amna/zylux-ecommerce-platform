const router = require("express").Router();

router.use("/users", require("./users.route"));

router.use("/categories", require("./categories.route"));

router.use("/products", require("./products.route"));

router.use("/orders", require("./orders.route"));

router.use("/wishlist", require("./wishlist.route"));

router.use("/reviews", require("./reviews.route"));

router.use("/messages", require("./messages.route"));

router.use("/notifications", require("./notifications.route"));

module.exports = router;
