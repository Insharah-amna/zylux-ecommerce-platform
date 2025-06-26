const GeneralErrors = require("../factories/errors/general");
const { asyncTryCatch } = require("../utils/tryCatchUtils");

module.exports =
	({ validateFunction, reqProperty = "body", options = {} }) =>
	async (req, res, next) => {
		const source = req[reqProperty];

		const context = { req, options };

		const {
			success,
			response: validationResult,
			error,
		} = await asyncTryCatch(() => validateFunction({ data: source, context }));

		if (!success) return GeneralErrors.internalServerError({ res });

		if (validationResult?.errors)
			return GeneralErrors.badRequestError({
				res,
				customMessage: validationResult.errors,
			});

		// Replace the original request property with the validated parameters
		if (validationResult?.parameters)
			req[reqProperty] = validationResult.parameters;

		next();
	};
