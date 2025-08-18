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
};

module.exports = OrderErrors;
