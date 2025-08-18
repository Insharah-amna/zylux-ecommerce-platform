const OrderResponses = {
	checkoutCreatedSuccessfully: ({ res, checkoutUrl }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Checkout created successfully",
			body: { checkoutUrl },
		});
	},

	orderCreatedSuccessfully: ({ res }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Order created successfully",
			body: {},
		});
	},

	orderStatusUpdatedSuccessfully: ({ res }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Order status updated successfully",
			body: {},
		});
	},
};

module.exports = OrderResponses;
