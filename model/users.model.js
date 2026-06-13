const mongoose = require("mongoose");
const { ROLES, DEFAULT_PROFILE_IMAGE } = require("../constants/general");

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
			default: true,
		},
		role: {
			type: String,
			default: ROLES.buyer.value,
		},
		profileImage: {
			type: String,
			default: DEFAULT_PROFILE_IMAGE,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("Users", userSchema);
