let io;

module.exports = {
	init: (server) => {
		const { Server } = require("socket.io");
		io = new Server(server, { cors: { origin: "*" } });

		const onlineUsers = new Set();

		io.on("connection", (socket) => {
			socket.on("join", (userId) => {
				socket.userId = userId;
				socket.join(userId);
				onlineUsers.add(userId);

				io.emit("onlineUsers", Array.from(onlineUsers));
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
				if (socket.userId) {
					const stillConnected = Array.from(io.sockets.sockets.values()).some(
						(s) => s.userId === socket.userId
					);

					if (!stillConnected) {
						onlineUsers.delete(socket.userId);
					}
				}

				io.emit("onlineUsers", Array.from(onlineUsers));
			});
		});

		return io;
	},

	getIo: () => {
		if (!io) throw new Error("Socket.io not initialized!");
		return io;
	},
};
