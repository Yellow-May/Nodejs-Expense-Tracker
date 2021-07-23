const express = require("express");
const router = express.Router();

const controller = require("../controllers/expense");

router.route("/").get(controller.getExpenses).post(controller.postExpense);
router.route("/:id").delete(controller.deleteExpense);

module.exports = router;
