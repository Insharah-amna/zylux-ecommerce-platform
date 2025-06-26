const UsersResponses = {
	userCreatedSuccessfully: ({ res, user }) => {
		return res.status(201).json({
			statusCode: 201,
			message: "User Created Successfully",
			user,
		});
	},
};

module.exports = UsersResponses;
