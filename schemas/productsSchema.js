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
	isOutOfStock: Yup.boolean().default(false),
	discount: Yup.number().min(0).max(100).required("Discount is required"),
};

const paginationSchema = {
	page: Yup.number().min(1).default(1),
	limit: Yup.number().min(1).default(1),
};

module.exports.validateProductsRequest = ({ data: products }) => {
	let data = JSON.parse(products.data);

	const schema = Yup.object().shape({
		...commonProductSchema,
	});

	return validate(schema, data);
};

module.exports.validateUpdateProductsRequest = ({ data: products }) => {
	let data = JSON.parse(products.data);

	const schema = Yup.object().shape({
		...commonProductSchema,
		imageUrls: Yup.array().required("Images urls are required"),
	});

	return validate(schema, data);
};

module.exports.validatePaginationRequest = ({ data: query }) => {
	const schema = Yup.object().shape({
		...paginationSchema,
	});

	return validate(schema, query);
};
