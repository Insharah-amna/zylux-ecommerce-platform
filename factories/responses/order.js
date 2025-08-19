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

	ordersFetchedSuccessfully: ({ res, orders, page, limit, totalPages }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Orders fetched successfully",
			body: { orders, pagination: { page, limit, totalPages } },
		});
	},

	orderDeletedSuccessfully: ({ res }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Order deleted successfully",
			body: {},
		});
	},
};

module.exports = OrderResponses;
