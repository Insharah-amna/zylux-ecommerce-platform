const MessageErrors = {
	sendingFailedErr: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "Failed to send message",
		});
	},

	messagesNotFound: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "Failed to fetch messages",
		});
	},
};

module.exports = MessageErrors;
