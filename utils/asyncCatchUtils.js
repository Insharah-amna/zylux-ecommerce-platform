const GeneralErrors = require("../factories/errors/general");

const catchAsync = (fn) => async (req, res) => {
	try {
		await fn(req, res);
	} catch (err) {
		return res.json(GeneralErrors.internalServerError);
	}
};

module.exports = catchAsync;
