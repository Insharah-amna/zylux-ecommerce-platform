let io;

module.exports = {
	init: (server) => {
		const { Server } = require("socket.io");
		io = new Server(server, { cors: { origin: "*" } });

		io.on("connection", (socket) => {
			socket.on("join", (userId) => {
				socket.join(userId);
			});

			socket.on("sendMessage", ({ senderId, receiverId, message }) => {
				const messageData = {
					_id: Date.now().toString(),
					senderId,
					receiverId,
					message,
					createdAt: new Date().toISOString(),
				};

				io.to(receiverId).emit("newMessage", messageData);
				io.to(senderId).emit("newMessage", messageData);
			});

			socket.on("disconnect", () => {
				// console.log("User disconnected:", socket.id);
			});
		});

		return io;
	},

	getIo: () => {
		if (!io) throw new Error("Socket.io not initialized!");
		return io;
	},
};
