const UsersResponses = {
	userCreatedSuccessfully: ({ res, user }) => {
		return res.status(201).json({
			statusCode: 201,
			message: "User Created Successfully",
			user,
		});
	},

	userLoggedInSuccessfully: ({ res, user, loginToken }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "User Logged in Successfully",
			body: { user, loginToken },
		});
	},

	emailSentSuccessfully: ({ res }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Reset password link has been sent successfully",
		});
	},

	passwordResetSuccessfully: ({ res, updatedUser }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Password has been reset successfully",
			updatedUser,
		});
	},

	loggedInProfileFetchedSuccessfully: ({ res, user }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Logged in profile fetched successfully",
			user,
		});
	},

	userVerifiedSuccessfully: ({ res }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "User has been verified successfully",
		});
	},
};

module.exports = UsersResponses;
