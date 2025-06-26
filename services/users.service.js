const UsersModel = require("../model/users.model");
const GeneralServices = require("./general.service");

const UsersService = {
	findUserByEmail: async ({ email }) => {
		const {
			error,
			response: user,
			success,
		} = await GeneralServices.findOne({
			model: UsersModel,
			query: { email },
		});

		return { success, user, error };
	},
};

module.exports = UsersService;
