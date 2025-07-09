const CategoriesController = require("../controllers/category.controller");
const catchAsync = require("../utils/asyncCatchUtils");

const router = require("express").Router();

router.post("/create", catchAsync(CategoriesController.createCategory));

router.get("/get-one/:id", catchAsync(CategoriesController.getCategory));

router.get("/get-many", catchAsync(CategoriesController.getCategories));

router.patch("/update/:id", catchAsync(CategoriesController.updateCategory));

router.delete("/delete", catchAsync(CategoriesController.deleteCategory));

module.exports = router;
