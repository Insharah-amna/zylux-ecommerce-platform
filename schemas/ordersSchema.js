const Yup = require("yup");
const { validate } = require("../utils/validatorUtils");

const commonOrderSchema = {
	details: Yup.array().of(
		Yup.object({
			name: Yup.string().required("Product name is required"),
			unitPrice: Yup.number().required("Product price is required"),
			quantity: Yup.number().required("Product quantity is required"),
			images: Yup.array()
				.of(Yup.string())
				.required("Product images are required"),
			discount: Yup.number().required("discount is required"),
			productId: Yup.string().required("Product id is required"),
		})
	),
	currency: Yup.string().required("Currency is required"),
	totalPrice: Yup.number().required("Total Price is required"),
	address: Yup.string().required("Address is required"),
	city: Yup.string().required("City is required"),
	country: Yup.string().required("Country is required"),
};

module.exports.validateOrderCheckoutRequest = ({ data: order }) => {
	const schema = Yup.object().shape({
		...commonOrderSchema,
	});

	return validate(schema, order);
};

module.exports.verifyOrderCheckoutRequest = ({ data: order }) => {
	const parsedOrder = {
		...order,
		products: JSON.parse(order.products),
	};

	const schema = Yup.object().shape({
		...commonOrderSchema,
	});

	return validate(schema, parsedOrder);
};
