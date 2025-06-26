const UsersModel = require("../model/users.model");
const UsersErrors = require("../factories/errors/users");
const UsersResponses = require("../factories/responses/users");
const UsersService = require("../services/users.service");
const { hashPassword } = require("../utils/passwordUtils");
const GeneralServices = require("../services/general.service");

const UsersController = {
	signupUser: async (req, res) => {
		const data = req.body;

		const { user: existedUser } = await UsersService.findUserByEmail({
			email: data.email,
		});

		if (existedUser) return UsersErrors.emailAlreadyExist({ res });

		const hashedPassword = await hashPassword({ password: data.password });

		data.password = hashedPassword;

		const { doc: newUser, error } = await GeneralServices.create({
			model: UsersModel,
			data,
		});

		let user = newUser.toObject();

		if (error) return UsersErrors.userCreationErr({ res });

		return UsersResponses.userCreatedSuccessfully({
			res,
			user: { ...user, password: undefined },
		});
	},
};

module.exports = UsersController;
