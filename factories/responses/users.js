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
			user,
			loginToken,
		});
	},
};

module.exports = UsersResponses;
