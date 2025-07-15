const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	categoryId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Categories",
		required: true,
	},
	colorVariants: {
		type: Array,
		required: true,
	},
	imageUrls: {
		type: Array,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Products", productsSchema);
