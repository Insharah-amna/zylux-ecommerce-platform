const UsersErrors = require("../factories/errors/users");

module.exports =
	({ allowedRoles }) =>
	async (req, res, next) => {
		const role = req.user.role;

		if (!allowedRoles.includes(role))
			return UsersErrors.forbiddenUserErr({ res });

		next();
	};
