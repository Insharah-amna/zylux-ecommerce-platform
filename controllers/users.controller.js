const UsersModel = require("../model/users.model");
const UsersErrors = require("../factories/errors/users");
const UsersResponses = require("../factories/responses/users");
const UsersService = require("../services/users.service");
const GeneralServices = require("../services/general.service");
const PasswordUtils = require("../utils/passwordUtils");
const { hashPassword } = require("../utils/passwordUtils");
const { generateToken } = require("../utils/jwtUtils");

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

	loginUser: async (req, res) => {
		const data = req.body;

		const { user: existedUser } = await UsersService.findUserByEmail({
			email: data.email,
		});

		if (!existedUser) return UsersErrors.wrongCredentialsErr({ res });

		const isPasswordMatch = await PasswordUtils.comparePassword({
			password: data.password,
			hashedPassword: existedUser.password,
		});

		let user = existedUser.toObject();
		user.password = undefined;

		if (!isPasswordMatch) return UsersErrors.wrongCredentialsErr({ res });

		const { token } = generateToken({ payLoad: user, expiresIn: "1d" });

		return UsersResponses.userLoggedInSuccessfully({
			res,
			user: { ...user, loginToken: token },
		});
	},
};

module.exports = UsersController;
