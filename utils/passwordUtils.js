const bcrypt = require("bcrypt");

const PasswordUtils = {
	hashPassword: async ({ password }) => {
		return await bcrypt.hash(password, 12);
	},
};

module.exports = PasswordUtils;
