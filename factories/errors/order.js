const OrderErrors = {
	CheckoutCreationFailed: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "Checkout creation failed",
			body: {},
		});
	},

	updationFailedErr: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "Updation failed",
		});
	},

	orderNotFound: ({ res }) => {
		return res.status(404).json({
			statusCode: 404,
			message: "Order Not Found",
		});
	},

	deletionFailed: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "Failed to delete order",
		});
	},
};

module.exports = OrderErrors;
