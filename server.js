const express = require("express");
const app = express();
require("dotenv").config();

const connectDB = require("./db/connect");
const expense = require("./routes/expense");
const notFound = require("./middlewares/not-found");

app.use(express.static("./dist"));
app.use(express.json());

app.use("/api/v1/expense", expense);
app.use(notFound);

const port = process.env.PORT || 3000;
const start = async () => {
	try {
		connectDB(process.env.MONGO_URI);
		app.listen(port, () => console.log(`server is listening on port ${port}...`));
	} catch (error) {
		console.log(error);
	}
};

start();
