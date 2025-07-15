const Yup = require("yup");
const { validate } = require("../utils/validatorUtils");

const commonProductSchema = {
	name: Yup.string().min(1).max(255).required("Product name is required"),
	price: Yup.number().required("Price is required"),
	categoryId: Yup.string().required("Category id required"),
	colorVariants: Yup.array()
		.of(Yup.string())
		.min(1, "At least one color is required")
		.required("Color variants are required"),
	description: Yup.string().required("Product description is required"),
};

module.exports.validateProductsRequest = ({ data: products }) => {
	const schema = Yup.object().shape({
		...commonProductSchema,
	});

	return validate(schema, products);
};
