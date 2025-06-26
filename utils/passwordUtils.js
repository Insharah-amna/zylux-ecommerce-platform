const bcrypt = require("bcrypt");

const PasswordUtils = {
	hashPassword: async ({ password }) => {
		return await bcrypt.hash(password, 12);
	},

	comparePassword: async ({ password, hashedPassword }) => {
		return await bcrypt.compare(password, hashedPassword);
	},
};

module.exports = PasswordUtils;
