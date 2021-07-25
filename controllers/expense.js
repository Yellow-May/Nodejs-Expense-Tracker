const Expense = require("../models/expense");
const asyncWrapper = require("../middlewares/async-wrapper");
const { customError } = require("../error/custom-error");

const getExpenses = asyncWrapper(async (_req, res) => {
	const expenses = await Expense.find();
	res.status(200).json({ expenses });
});

const postExpense = asyncWrapper(async (req, res) => {
	const expense = await Expense.create(req.body);
	res.status(201).json({ expense });
});

const deleteExpense = asyncWrapper(async (req, res, next) => {
	const id = req.params.id;
	const expense = await Expense.findOneAndDelete({ _id: id });
	if (!expense) return next(customError(`No transaction with id ${id}`, 404));
	res.status(200).json({ expense });
});

module.exports = { getExpenses, postExpense, deleteExpense };
