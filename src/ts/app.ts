// expense section
const balanceEl = document.getElementById("balance");
const balanceTypeEl = document.getElementById("balanceType");
const profitEl = document.getElementById("profit");
const lossEl = document.getElementById("loss");

// form section
const formEl = document.querySelector("form");
const amountInp = document.getElementById("amount") as HTMLInputElement;
const descInp = document.getElementById("desc") as HTMLInputElement;
const typesSel = document.getElementById("types") as HTMLSelectElement;
const dateInp = document.getElementById("date") as HTMLInputElement;

// app state
const state = {
	balance: 14000,
	profit: 36000,
	loss: 22000,
	transactions: [
		{
			id: "1",
			amount: 20000,
			description: "Bought a car",
			date: new Date("2021-07-18"),
			type: "loss",
		},
		{
			id: "2",
			amount: 500,
			description: "Youtube payment",
			date: new Date("2021-07-10"),
			type: "profit",
		},
		{
			id: "3",
			amount: 10000,
			description: "Contract work payment",
			date: new Date("2021-07-08"),
			type: "profit",
		},
		{
			id: "4",
			amount: 1000,
			description: "Bills Payment",
			date: new Date("2021-07-02"),
			type: "loss",
		},
		{
			id: "5",
			amount: 1000,
			description: "Miscellaneous",
			date: new Date("2021-07-02"),
			type: "loss",
		},
		{
			id: "6",
			amount: 15000,
			description: "Contract work payment",
			date: new Date("2021-07-01"),
			type: "profit",
		},
		{
			id: "7",
			amount: 10000,
			description: "Contract work payment",
			date: new Date("2021-06-20"),
			type: "profit",
		},
		{
			id: "8",
			amount: 500,
			description: "Youtube payment",
			date: new Date("2021-06-10"),
			type: "profit",
		},
	],
};

const createTransactionEl = (transaction: {
	id: string;
	amount: number;
	description: string;
	date: Date;
	type: string;
}) => {
	const wrapper = document.createElement("li");
	wrapper.setAttribute("data-id", transaction.id);

	const content = document.createElement("div");
	content.className = "content";

	const transactionType = document.createElement("div");
	transactionType.className = `type ${transaction.type}`;

	const arrowIcon = document.createElement("i");
	arrowIcon.className =
		transaction.type === "profit" ? "fas fa-long-arrow-alt-up" : "fas fa-long-arrow-alt-down";

	const amount = document.createElement("h3");
	amount.innerText = transaction.amount.toLocaleString();

	const btnToggle = document.createElement("button");
	btnToggle.title = "toggle-more";

	const moreIcon = document.createElement("i");
	moreIcon.className = "fas fa-ellipsis-h";

	transactionType.append(arrowIcon);
	btnToggle.append(moreIcon);

	content.append(transactionType);
	content.append(amount);
	content.append(btnToggle);

	const more = document.createElement("div");
	more.className = "more";

	const details = document.createElement("div");
	details.className = "details";

	const dateSpan = document.createElement("span");
	dateSpan.className = "date";
	dateSpan.innerText = transaction.date.toLocaleDateString();

	const descSpan = document.createElement("span");
	descSpan.className = "desc";
	descSpan.innerText = transaction.description;

	const btnDel = document.createElement("button");
	btnDel.title = "delete transaction";

	const delIcon = document.createElement("i");
	delIcon.className = "fas fa-trash-alt";

	details.append(dateSpan);
	details.append(" | ");
	details.append(descSpan);

	btnDel.append(delIcon);

	more.append(details);
	more.append(btnDel);

	wrapper.append(content);
	wrapper.append(more);

	return wrapper;
};

const render = () => {
	// transactions section
	const transactionsListEl = document.getElementById("transactionsList");

	if (balanceEl && balanceTypeEl && profitEl && lossEl && transactionsListEl) {
		balanceEl.innerText = state.balance.toLocaleString();
		balanceTypeEl.className =
			state.balance < 0 ? "fas fa-long-arrow-alt-down" : "fas fa-long-arrow-alt-up";
		balanceTypeEl.style.display = state.balance === 0 ? "none" : "";
		profitEl.innerText = state.profit.toLocaleString();
		lossEl.innerText = state.loss.toLocaleString();

		const transactions = state.transactions.map(transaction => createTransactionEl(transaction));
		transactions.forEach(transaction => transactionsListEl.append(transaction));
	}
};

const uiFuncs = () => {
	const transactions = (
		document.getElementById("transactionsList") as HTMLUListElement
	).querySelectorAll("li");

	if (transactions) {
		transactions.forEach(transaction => {
			const content = transaction.querySelector(".content");
			const btnToggle = content?.querySelector("button");
			const more = transaction.querySelector(".more");
			btnToggle?.addEventListener("click", () => more?.classList.toggle("open"));

			const btnDel = more?.querySelector("button");
			btnDel?.addEventListener("click", () => {
				transaction.remove();
			});
		});
	}
};

const formEvent = () => {
	if (formEl && amountInp && descInp && typesSel && dateInp) {
		formEl.addEventListener("submit", e => {
			e.preventDefault();

			if (amountInp.value && descInp.value && typesSel.value && dateInp.value) {
				const newTransaction = {
					amount: amountInp.value,
					description: descInp.value,
					type: typesSel.value,
					date: dateInp.value,
				};

				console.log(newTransaction);

				amountInp.value = "";
				descInp.value = "";
				typesSel.value = "";
				dateInp.value = "";
			}
		});
	}
};

document.addEventListener("DOMContentLoaded", () => {
	render();
	uiFuncs();
	formEvent();
});

// with db
// getTransactions
// postTransaction
// deleteTransaction
// uiFuncs () => { deleteTransaction }
// onLoad () => { getTransactions(), uiFuncs() }
