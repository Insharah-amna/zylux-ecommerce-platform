const Yup = require("yup");
const { validate } = require("../utils/validatorUtils");

const commonReviewSchema = {
	rating: Yup.number().min(0).max(5).required("Rating is required"),
	subject: Yup.string().required("Subject is required"),
	comment: Yup.string().required("Comment is required"),
};

module.exports.validateAddReviewRequest = ({ data: review }) => {
	const schema = Yup.object().shape({
		...commonReviewSchema,
	});

	return validate(schema, review);
};

module.exports.validateProductIdParamsRequest = ({ data: productId }) => {
	const schema = Yup.object().shape({
		productId: Yup.string().required("Product id is required"),
	});

	return validate(schema, productId);
};
