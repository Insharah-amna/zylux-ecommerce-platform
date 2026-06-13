const NotificationErrors = {
	sendingFailedErr: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "Failed to send notification",
		});
	},

	notificationsNotFound: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "Failed to fetch notifications",
		});
	},

	failedToUpdate: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "Failed to update notifications",
		});
	},
};

module.exports = NotificationErrors;
