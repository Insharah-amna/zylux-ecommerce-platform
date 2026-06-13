const GeneralErrors = require("../factories/errors/general");
const StripeServices = require("../services/stripe.service");

module.exports = async (req, res, next) => {
	try {
		const { err, event } = await StripeServices.verifyWebhookSignature({
			req,
		});
		if (err) throw err;
		req.webhookEvent = event;
		next();
	} catch (error) {
		return GeneralErrors.unauthenticated({ res });
	}
};
