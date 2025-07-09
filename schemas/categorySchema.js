const Yup = require("yup");
const { validate } = require("../utils/validatorUtils");

const commonCategorySchema = {
	name: Yup.string().min(1).max(255).required("Name is required"),
};

module.exports.validateCategoryRequest = ({ data: categories }) => {
	const schema = Yup.object().shape({
		...commonCategorySchema,
	});

	return validate(schema, categories);
};
