const mongoose = require("mongoose");
const { ROLES } = require("../constants/general");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isUserVerified: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			default: ROLES.buyer.value,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Users", userSchema);
