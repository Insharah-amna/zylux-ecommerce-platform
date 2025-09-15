const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users",
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		relatedId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			refPath: "typeRef",
		},
		typeRef: {
			type: String,
			required: true,
			enum: ["Orders", "Products"],
		},
		isRead: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Notifications", notificationSchema);
