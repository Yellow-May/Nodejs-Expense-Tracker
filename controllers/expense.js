const Expense = require("../models/expense");

const getExpenses = async (req, res) => {
	try {
		const expenses = await Expense.find();
		res.status(200).json({ expenses });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const postExpense = async (req, res) => {
	try {
		const expense = await Expense.create(req.body);
		res.status(201).json({ expense });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const deleteExpense = async (req, res) => {
	try {
		const id = req.params.id;
		const expense = await Expense.findOneAndDelete({ _id: id });
		if (!expense) return res.status(404).json({ message: `No transaction with id ${id}` });
		res.status(200).json({ expense });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = { getExpenses, postExpense, deleteExpense };
