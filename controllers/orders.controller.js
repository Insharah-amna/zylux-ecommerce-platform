const OrderErrors = require("../factories/errors/order");
const OrderResponses = require("../factories/responses/order");
const GeneralServices = require("../services/general.service");
const StripeServices = require("../services/stripe.service");
const OrdersModel = require("../model/orders.model");
const { ORDER_STATUS } = require("../constants/orders");
const { GetPaginationSkip } = require("../constants/general");
const { buildOrdersQuery } = require("../utils/buildQueryUtils");
const usersModel = require("../model/users.model");
const UsersErrors = require("../factories/errors/users");

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
		try {
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

			res.status(200).json({ received: true });
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},

	getAllOrders: async (req, res) => {
		const { page, limit } = req.query;

		const { skip } = GetPaginationSkip({ page, limit });

		const query = buildOrdersQuery();

		const { count } = await GeneralServices.countDocuments({
			model: OrdersModel,
			query,
		});

		const { error, response: orders } = await GeneralServices.find({
			model: OrdersModel,
			query,
			options: {
				populatedFields: "userId",
				queryProperties: {
					limit,
					skip,
					sort: { createdAt: -1 },
				},
			},
		});

		return OrderResponses.ordersFetchedSuccessfully({
			res,
			orders,
			page,
			limit,
			totalPages: Math.ceil(count / limit),
		});
	},

	getOrdersByUserId: async (req, res) => {
		const id = req.user._id;

		const { page, limit } = req.query;

		const { skip } = GetPaginationSkip({ page, limit });

		const query = buildOrdersQuery(id);

		const { count } = await GeneralServices.countDocuments({
			model: OrdersModel,
			query,
		});

		const { error: userError, response: user } = await GeneralServices.findById(
			{
				model: usersModel,
				id,
			},
		);

		if (!user || userError) return UsersErrors.userNotFoundErr({ res });

		const { error, response: orders } = await GeneralServices.find({
			model: OrdersModel,
			query,
			options: { limit, skip, sort: { createdAt: -1 } },
		});

		if (error || !orders) return OrderErrors.orderNotFound({ res });

		return OrderResponses.ordersFetchedSuccessfully({
			res,
			orders,
			page,
			limit,
			totalPages: Math.ceil(count / limit),
		});
	},
};

module.exports = OrdersController;
