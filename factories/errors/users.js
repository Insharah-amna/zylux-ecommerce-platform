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

	wrongCredentialsErr: ({ res }) => {
		return res.status(401).json({
			statusCode: 401,
			message: "Wrong Credentials",
		});
	},

	userNotFoundErr: ({ res }) => {
		return res.status(404).json({
			statusCode: 404,
			message: "User Not Found",
		});
	},

	tokenVerificationErr: ({ res }) => {
		return res.status(401).json({
			statusCode: 401,
			message: "Token is invalid or has been expired",
		});
	},
};

module.exports = UsersErrors;
