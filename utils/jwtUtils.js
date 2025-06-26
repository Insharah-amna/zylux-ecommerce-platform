const jwtToken = require("jsonwebtoken");
const { tryCatch } = require("./tryCatchUtils");
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

const jwtUtils = {
	generateToken: ({ payLoad, expiresIn }) => {
		const { error, response } = tryCatch(() =>
			jwtToken.sign(payLoad, JWT_TOKEN_SECRET, { expiresIn })
		);

		return { error, token: response };
	},
};

module.exports = jwtUtils;
