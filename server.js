require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connection = require("./db");
const http = require("http");
const socket = require("./socket");

const app = express();
const server = http.createServer(app);
const io = socket.init(server);
const port = process.env.PORT || 3001;

connection();

app.use(
	cors({
		origin: [process.env.FRONTEND_APP_URL, process.env.CLIENT_URL],
		credentials: true,
	}),
);

app.use("/orders/webhook", express.raw({ type: "application/json" }));

app.use(express.json());

app.use("/", require("./routes"));

server.listen(port, () => console.log("Server is running on port", port));

module.exports = { io };
