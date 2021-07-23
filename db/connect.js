const mongoose = require("mongoose");

const dbName = "Expense-Tracker";

const connectDB = url => {
	mongoose.connect(url, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});
};

module.exports = connectDB;
