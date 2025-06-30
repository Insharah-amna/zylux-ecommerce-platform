const UsersErrors = require("../factories/errors/users");
const UsersModel = require("../model/users.model");
const GeneralServices = require("../services/general.service");
const jwtUtils = require("../utils/jwtUtils");
const { tryCatch } = require("../utils/tryCatchUtils");

module.exports = async (req, res, next) => {
	const authHeader = req.headers["authorization"];

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return UsersErrors.tokenVerificationErr({ res });
	}

	const token = authHeader.split(" ")[1];

	if (!token) return UsersErrors.unAuthorizedUserErr({ res });

	const { decodedData } = jwtUtils.verifyToken({ token });

	if (!decodedData) return UsersErrors.tokenVerificationErr({ res });

	const { response: user } = await GeneralServices.findById({
		model: UsersModel,
		id: decodedData._id,
	});

	user.password = undefined;

	if (!user) return UsersErrors.userNotFoundErr({ res });

	req.user = user;

	next();
};
