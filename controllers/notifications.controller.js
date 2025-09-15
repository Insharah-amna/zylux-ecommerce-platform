const GeneralServices = require("../services/general.service");
const NotificationsModel = require("../model/notifications.model");
const NotificationErrors = require("../factories/errors/notifications");
const NotificationResponses = require("../factories/responses/notifications");

const NotificationsController = {
	sendNotification: async (req, res) => {
		let { userId, message, relatedId, typeRef } = req.body;

		const { error, doc: newNotification } = await GeneralServices.create({
			model: NotificationsModel,
			data: { userId, message, relatedId, typeRef, isRead: false },
		});

		if (error) return NotificationErrors.sendingFailedErr({ res });

		return NotificationResponses.notificationSentSuccessfully({
			res,
			notification: newNotification,
		});
	},

	getNotifications: async (req, res) => {
		const { error, response: notifications } = await GeneralServices.find({
			model: NotificationsModel,
			options: {
				populatedFields: "relatedId",
				queryProperties: {
					limit: 15,
					sort: { createdAt: -1 },
				},
			},
		});

		if (error) return NotificationErrors.notificationsNotFound({ res });

		return NotificationResponses.notificationsFetchedSuccessfully({
			res,
			notifications,
		});
	},

	updateNotifications: async (req, res) => {
		const { error, response: updatedNotifications } =
			await GeneralServices.updateMany({
				model: NotificationsModel,
				filter: { isRead: false },
				update: {
					$set: { isRead: true },
				},
			});

		if (error) return NotificationErrors.failedToUpdate({ res });

		return NotificationResponses.notificationsUpdatedSuccessfully({
			res,
			notifications: updatedNotifications,
		});
	},
};

module.exports = NotificationsController;
