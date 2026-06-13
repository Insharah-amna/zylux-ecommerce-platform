const NotificationResponses = {
	notificationSentSuccessfully: ({ res, notification }) => {
		return res.status(201).json({
			statusCode: 201,
			message: "Notification sent successfully",
			body: { notification },
		});
	},

	notificationsFetchedSuccessfully: ({ res, notifications }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Data fetched successfully",
			body: { notifications },
		});
	},

	notificationsUpdatedSuccessfully: ({ res, notifications }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Notifications updated successfully",
			body: { notifications },
		});
	},
};

module.exports = NotificationResponses;
