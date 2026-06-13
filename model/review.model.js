const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users",
			required: true,
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Products",
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
		subject: {
			type: String,
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
