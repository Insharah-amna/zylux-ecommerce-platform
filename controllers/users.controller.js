const UsersModel = require("../model/users.model");
const UsersErrors = require("../factories/errors/users");
const UsersResponses = require("../factories/responses/users");
const UsersService = require("../services/users.service");
const GeneralServices = require("../services/general.service");
const PasswordUtils = require("../utils/passwordUtils");
const { hashPassword } = require("../utils/passwordUtils");
const { generateToken, verifyToken } = require("../utils/jwtUtils");
const { getDateTimeInMillis } = require("../utils/datesUtils");
const {
	sendEmailVerificationLink,
} = require("../utils/email/processes/sendEmailVerificationLink");
const {
	sendResetPasswordLink,
} = require("../utils/email/processes/sendResetPasswordLink");
const { asyncTryCatch } = require("../utils/tryCatchUtils");

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

		await sendEmailVerificationLink({ userEmail: data.email });

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

		if (!existedUser.isUserVerified)
			return UsersErrors.unVerifiedUserErr({ res });

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

	forgotPassword: async (req, res) => {
		const data = req.body;

		const { user: existedUser } = await UsersService.findUserByEmail({
			email: data.email,
		});

		if (!existedUser) return UsersErrors.userNotFoundErr({ res });

		existedUser.password = undefined;

		await sendResetPasswordLink({ user: existedUser });

		return UsersResponses.emailSentSuccessfully({ res });
	},

	resetPassword: async (req, res) => {
		const { token } = req.params;
		const data = req.body;

		const { decodedData, error: decodedError } = verifyToken({ token });

		if (decodedError || !decodedData)
			return UsersErrors.tokenVerificationErr({ res });

		const currentDateTime = getDateTimeInMillis();

		if (decodedData.exp > currentDateTime)
			return UsersErrors.tokenVerificationErr({ res });

		const hashedPassword = await hashPassword({ password: data.password });

		data.password = hashedPassword;

		const { updatedDoc: updatedUser } = await GeneralServices.findByIdAndUpdate(
			{
				model: UsersModel,
				data,
				id: decodedData._id,
			}
		);

		let user = updatedUser.toObject();
		user.password = undefined;

		return UsersResponses.passwordResetSuccessfully({ res, user });
	},

	getProfile: async (req, res) => {
		const user = req.user;

		return UsersResponses.loggedInProfileFetchedSuccessfully({ res, user });
	},

	verifyEmail: async (req, res) => {
		const { token } = req.params;

		const { decodedData, error: decodedError } = verifyToken({ token });

		if (decodedError || !decodedData)
			return UsersErrors.tokenVerificationErr({ res });

		const currentDateTime = getDateTimeInMillis();

		if (decodedData.exp > currentDateTime)
			return UsersErrors.tokenVerificationErr({ res });

		const { user: existedUser } = await UsersService.findUserByEmail({
			email: decodedData.email,
		});

		const { error, updatedDoc: updatedUser } =
			await GeneralServices.findByIdAndUpdate({
				model: UsersModel,
				id: existedUser._id,
				data: { isUserVerified: true },
			});

		if (error) return UsersErrors.verificationFailedErr({ res });

		return UsersResponses.userVerifiedSuccessfully({ res });
	},

	resendVerificationEmail: async (req, res) => {
		try {
			const { email } = req.params;

			await sendEmailVerificationLink({ userEmail: email });

			return UsersResponses.verificationLinkSentSuccessfully({ res });
		} catch (error) {
			return UsersErrors.verificationFailedErr({ res });
		}
	},
};

module.exports = UsersController;
