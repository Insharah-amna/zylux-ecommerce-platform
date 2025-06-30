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
			message: "Token is invalid or expired",
		});
	},

	unAuthorizedUserErr: ({ res }) => {
		return res.status(401).json({
			statusCode: 401,
			message: "UnAuthorization Error",
		});
	},

	verificationFailedErr: ({ res }) => {
		return res.status(401).json({
			statusCode: 401,
			message: "User Verification Failed",
		});
	},

	unVerifiedUserErr: ({ res }) => {
		return res.status(403).json({
			statusCode: 403,
			message: "User is not verified",
		});
	},
};

module.exports = UsersErrors;
