const GeneralServices = require("../services/general.service");
const MessagesModel = require("../model/messages.model");
const MessageErrors = require("../factories/errors/messages");
const MessageResponses = require("../factories/responses/messages");
const UsersModel = require("../model/users.model");
const socket = require("../socket");
const ADMIN_ID = process.env.ADMIN_ID;

const MessagesController = {
	sendMessage: async (req, res) => {
		let { message, receiverId = null } = req.body;
		const senderId = req.user._id;

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

		const io = socket.getIo();
		io.to(receiverId).emit("newMessage", newMessage);

		return MessageResponses.messageSentSuccessfully({
			res,
			message: newMessage,
		});
	},

	getMessageByUserId: async (req, res) => {
		const userId = req.user._id;

		const { error, response: messages } = await GeneralServices.findAll({
			model: MessagesModel,
			filter: {
				$or: [
					{ senderId: userId, receiverId: ADMIN_ID },
					{ senderId: ADMIN_ID, receiverId: userId },
				],
			},
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
};

module.exports = MessagesController;
