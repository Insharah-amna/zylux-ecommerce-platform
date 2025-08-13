const UsersResponses = {
	userCreatedSuccessfully: ({ res, user }) => {
		return res.status(201).json({
			statusCode: 201,
			message:
				"Sign-up successful! Verify your email to complete registration.",
			body: { user },
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
			body: {},
		});
	},

	passwordResetSuccessfully: ({ res, updatedUser }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Password has been reset successfully",
			body: { updatedUser },
		});
	},

	loggedInProfileFetchedSuccessfully: ({ res, user }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Logged in profile fetched successfully",
			body: { user },
		});
	},

	verificationLinkSentSuccessfully: ({ res }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Verification link has been sent successfully",
			body: {},
		});
	},

	userVerifiedSuccessfully: ({ res }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "User has been verified successfully",
			body: {},
		});
	},
};

module.exports = UsersResponses;
