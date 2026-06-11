const mongoose = require("mongoose");
const dburl = process.env.DB_URL;

const connection = async () => {
	try {
		await mongoose.connect(dburl);
		console.log("Database connected successfully.");
	} catch (error) {
		console.log("Connection failed.", error);
	}
};

module.exports = connection;
