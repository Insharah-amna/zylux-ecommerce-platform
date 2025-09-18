const GeneralErrors = require("../factories/errors/general");

const catchAsync = (fn) => async (req, res) => {
	try {
		await fn(req, res);
	} catch (err) {
		console.log(err);
		return GeneralErrors.internalServerError({ res });
	}
};

module.exports = catchAsync;
