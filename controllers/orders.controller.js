const OrderErrors = require("../factories/errors/order");
const OrderResponses = require("../factories/responses/order");
const GeneralServices = require("../services/general.service");
const StripeServices = require("../services/stripe.service");
const OrdersModel = require("../model/orders.model");
const { ORDER_STATUS } = require("../constants/orders");

const OrdersController = {
	createOrder: async (req, res) => {
		const data = req.body;
		const userId = req.user._id;

		const { error, doc: order } = await GeneralServices.create({
			model: OrdersModel,
			data: { ...data, status: ORDER_STATUS.in_process.value, userId },
		});

		if (error) OrderErrors.CheckoutCreationFailed({ res });

		const { checkoutUrl, error: checkoutErr } =
			await StripeServices.createCheckoutUrl({ order });

		if (checkoutErr) {
			const orderId = order._id;

			await GeneralServices.findByIdAndDelete({
				model: OrdersModel,
				id: orderId,
			});

			return OrderErrors.updationFailedErr({ res });
		}

		return OrderResponses.checkoutCreatedSuccessfully({ res, checkoutUrl });
	},

	verifyOrder: async (req, res) => {
		if (req.webhookEvent.type === "checkout.session.completed") {
			const id = req.webhookEvent.data.object.metadata._id;

			const updatedData = {
				status: ORDER_STATUS.placed.value,
			};

			await GeneralServices.findByIdAndUpdate({
				model: OrdersModel,
				data: updatedData,
				id,
			});
		}
	},
};

module.exports = OrdersController;
