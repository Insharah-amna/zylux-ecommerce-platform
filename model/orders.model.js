const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users",
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		details: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Products",
				},
				name: {
					type: String,
				},
				images: {
					type: Array,
				},
				unitPrice: {
					type: Number,
				},
				quantity: {
					type: Number,
				},
				discount: {
					type: Number,
				},
			},
		],
		totalPrice: {
			type: Number,
			required: true,
		},
		currency: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Orders", orderSchema);
