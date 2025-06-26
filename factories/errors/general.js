const GeneralErrors = {
	internalServerError: ({ res }) => {
		return res
			.status(500)
			.json({ statusCode: 500, message: "Internal Server Error" });
	},

	badRequestError: ({ res, customMessage } = {}) => {
		return res
			.status(400)
			.json({ statusCode: 400, message: customMessage || "Bad Request Error" });
	},
};

module.exports = GeneralErrors;
