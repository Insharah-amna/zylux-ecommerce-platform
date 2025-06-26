require("dotenv").config();
const express = require("express");
const connection = require("./db");
const app = express();
const port = process.env.PORT;

connection();

app.use(express.json());

app.use("/", require("./routes"));

app.listen(port, () => console.log("Server is running on port ", port));
