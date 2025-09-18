const Stripe = require("stripe");
const { asyncTryCatch } = require("../utils/tryCatchUtils");
const { prepareCheckoutLineItems } = require("../utils/checkoutUtils");

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.WEBHOOK_SECRET_KEY;
const stripe = new Stripe(stripeSecretKey);

const StripeServices = {
	createCheckoutUrl: async ({ order }) => {
		const userId = order.userId.toString();
		const _id = order._id.toString();

		const preparedData = prepareCheckoutLineItems({
			products: order.details,
			currency: order.currency,
		});

		const { error, response } = await asyncTryCatch(
			async () =>
				await stripe.checkout.sessions.create({
					payment_method_types: ["card"],
					mode: "payment",
					line_items: preparedData,
					success_url: process.env.STRIPE_SUCCESS_URL,
					cancel_url: process.env.STRIPE_CANCEL_URL,
					metadata: {
						userId,
						_id,
						details: JSON.stringify(order.details),
					},
				})
		);

		return { error, checkoutUrl: response.url };
	},

	verifyWebhookSignature: async ({ req }) => {
		try {
			const sig = req.headers["stripe-signature"];
			const event = await stripe.webhooks.constructEvent(
				req.body,
				sig,
				webhookSecret
			);
			return { success: true, event };
		} catch (err) {
			return { success: false, err };
		}
	},
};

module.exports = StripeServices;
