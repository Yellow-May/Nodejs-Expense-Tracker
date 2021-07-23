const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
	amount: {
		type: Number,
		required: [true, "Must provide amount"],
	},
	type: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		trim: true,
		required: [true, "Must provide description"],
		maxLength: [30, "Please shorten your description"],
	},
	date: {
		type: String,
		default: new Date().toLocaleDateString(),
	},
});

module.exports = mongoose.model("Expense", ExpenseSchema);
