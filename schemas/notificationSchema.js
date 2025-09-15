const Yup = require("yup");
const { validate } = require("../utils/validatorUtils");

const commonNotificationSchema = {
	userId: Yup.string().required("User id is required"),
	message: Yup.string().required("Message is required"),
	relatedId: Yup.string().required("Related id is required"),
	typeRef: Yup.string().required("Type Reference is required"),
	isRead: Yup.boolean().default(false),
};

module.exports.validateNotificationRequest = ({ data: notifications }) => {
	const schema = Yup.object().shape({
		...commonNotificationSchema,
	});

	return validate(schema, notifications);
};
