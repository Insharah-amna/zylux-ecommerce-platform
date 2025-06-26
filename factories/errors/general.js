const GeneralErrors = {
	internalServerError: () => {
		return { statusCode: 500, message: "Internal Server Error" };
	},
};

module.exports = GeneralErrors;
