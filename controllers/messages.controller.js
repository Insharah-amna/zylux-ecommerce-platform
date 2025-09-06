const GeneralServices = require("../services/general.service");
const MessagesModel = require("../model/messages.model");
const MessageErrors = require("../factories/errors/messages");
const MessageResponses = require("../factories/responses/messages");
const UsersModel = require("../model/users.model");
const { buildMessagesQuery } = require("../utils/buildQueryUtils");
const ADMIN_ID = process.env.ADMIN_ID;

const MessagesController = {
	sendMessage: async (req, res) => {
		let { message, senderId, receiverId } = req.body;

		const { response: sender } = await GeneralServices.findById({
			model: UsersModel,
			id: senderId,
		});

		if (sender.role === "buyer") {
			receiverId = ADMIN_ID;
		}

		const { error, doc: newMessage } = await GeneralServices.create({
			model: MessagesModel,
			data: { message, senderId, receiverId },
		});

		if (error) return MessageErrors.sendingFailedErr({ res });

		return MessageResponses.messageSentSuccessfully({
			res,
			message: newMessage,
		});
	},

	getMessageByUserId: async (req, res) => {
		const { id: userId } = req.params;

		const filter = {
			$or: [
				{ senderId: userId, receiverId: ADMIN_ID },
				{ senderId: ADMIN_ID, receiverId: userId },
			],
		};

		const { error, response: messages } = await GeneralServices.findAll({
			model: MessagesModel,
			filter,
			options: {
				queryProperties: {
					sort: { createdAt: 1 },
				},
			},
		});

		if (error) return MessageErrors.messagesNotFound({ res });

		return MessageResponses.messagesFetchedSuccessfully({
			res,
			messages,
		});
	},

	getDistinctUsers: async (req, res) => {
		const filter = buildMessagesQuery();

		const { error, response: usersList } =
			await GeneralServices.getDistinctValues({
				model: MessagesModel,
				query: filter,
			});

		if (error) return MessageErrors.messagesNotFound({ res });

		return MessageResponses.usersMessagesFetchedSuccessfully({
			res,
			usersList,
		});
	},
};

module.exports = MessagesController;
