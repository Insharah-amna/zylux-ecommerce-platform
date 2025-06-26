const UsersErrors = {
	emailAlreadyExist: ({ res }) => {
		return res.status(409).json({
			statusCode: 409,
			message: "Email already exist",
		});
	},
	userCreationErr: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "User creation failed",
		});
	},
};

module.exports = UsersErrors;
