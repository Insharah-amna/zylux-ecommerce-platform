const Yup = require("yup");
const { validate } = require("../utils/validatorUtils");

const commonMessageSchema = {
	message: Yup.string().required("Message is required"),
};

module.exports.validateMessageRequest = ({ data: messages }) => {
	const schema = Yup.object().shape({
		...commonMessageSchema,
	});

	return validate(schema, messages);
};
