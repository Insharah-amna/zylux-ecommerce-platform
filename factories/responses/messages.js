const MessageResponses = {
	messageSentSuccessfully: ({ res, message }) => {
		return res.status(201).json({
			statusCode: 201,
			message: "Message sent successfully",
			body: { message },
		});
	},

	messagesFetchedSuccessfully: ({ res, messages }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Data fetched successfully",
			body: { messages },
		});
	},

	usersMessagesFetchedSuccessfully: ({ res, usersList }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Data fetched successfully",
			body: { usersList },
		});
	},
};

module.exports = MessageResponses;
