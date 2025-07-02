require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connection = require("./db");
const app = express();
const port = process.env.PORT;

connection();

app.use(
	cors({
		origin: process.env.FRONTEND_APP_URL,
		credentials: true,
	})
);

app.use(express.json());

app.use("/", require("./routes"));

app.listen(port, () => console.log("Server is running on port ", port));
