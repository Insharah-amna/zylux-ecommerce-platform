const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
	{
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
		isOutOfStock: {
			type: Boolean,
			default: false,
		},
		discount: {
			type: Number,
			default: 0,
		},
		imageUrls: {
			type: Array,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Products", productsSchema);
