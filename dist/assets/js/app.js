"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// expense section
const balanceEl = document.getElementById("balance");
const balanceTypeEl = document.getElementById("balanceType");
const profitEl = document.getElementById("profit");
const lossEl = document.getElementById("loss");
// form section
const formEl = document.querySelector("form");
const amountInp = document.getElementById("amount");
const descInp = document.getElementById("desc");
const typesSel = document.getElementById("types");
const dateInp = document.getElementById("date");
const createTransactionEl = (transaction) => {
    const wrapper = document.createElement("li");
    wrapper.setAttribute("data-id", transaction._id);
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
    dateSpan.innerText = transaction.date;
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
const uiFuncs = () => {
    const transactions = document.getElementById("transactionsList").querySelectorAll("li");
    if (transactions) {
        transactions.forEach(transaction => {
            const content = transaction.querySelector(".content");
            const btnToggle = content === null || content === void 0 ? void 0 : content.querySelector("button");
            const more = transaction.querySelector(".more");
            btnToggle === null || btnToggle === void 0 ? void 0 : btnToggle.addEventListener("click", () => more === null || more === void 0 ? void 0 : more.classList.toggle("open"));
            const btnDel = more === null || more === void 0 ? void 0 : more.querySelector("button");
            btnDel === null || btnDel === void 0 ? void 0 : btnDel.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const res = yield fetch(`/api/v1/expense/${transaction.dataset.id}`, {
                        method: "DELETE",
                    });
                    const status = res.status;
                    if (status === 200)
                        yield render();
                }
                catch (err) {
                    console.log(err);
                }
            }));
        });
    }
};
const render = () => __awaiter(void 0, void 0, void 0, function* () {
    // transactions section
    const transactionsListEl = document.getElementById("transactionsList");
    try {
        const res = yield fetch("/api/v1/expense");
        const data = (yield res.json()).expenses;
        const profit = data
            .filter(transaction => transaction.type === "profit")
            .reduce((a, b) => a + b.amount, 0);
        const loss = data
            .filter(transaction => transaction.type === "loss")
            .reduce((a, b) => a + b.amount, 0);
        const balance = profit - loss;
        if (balanceEl && balanceTypeEl && profitEl && lossEl && transactionsListEl) {
            balanceEl.innerText = balance.toLocaleString();
            balanceTypeEl.className =
                balance < 0 ? "fas fa-long-arrow-alt-down" : "fas fa-long-arrow-alt-up";
            balanceTypeEl.style.display = balance === 0 ? "none" : "";
            profitEl.innerText = profit.toLocaleString();
            lossEl.innerText = loss.toLocaleString();
            Array.from(transactionsListEl.children).forEach(el => el.remove());
            const transactions = data.map(transaction => createTransactionEl(transaction));
            transactions.forEach(transaction => transactionsListEl.append(transaction));
            uiFuncs();
        }
    }
    catch (err) {
        console.log(err);
    }
});
const formEvent = () => {
    if (formEl && amountInp && descInp && typesSel && dateInp) {
        formEl.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
            e.preventDefault();
            if (amountInp.value && descInp.value && typesSel.value) {
                const newTransaction = dateInp.value
                    ? {
                        amount: amountInp.value,
                        description: descInp.value,
                        type: typesSel.value,
                        date: new Date(dateInp.value).toLocaleDateString(),
                    }
                    : {
                        amount: amountInp.value,
                        description: descInp.value,
                        type: typesSel.value,
                    };
                try {
                    const res = yield fetch("/api/v1/expense", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newTransaction),
                    });
                    const status = res.status;
                    if (status === 201)
                        yield render();
                }
                catch (err) {
                    console.log(err);
                }
                amountInp.value = "";
                descInp.value = "";
                typesSel.value = "";
                dateInp.value = "";
            }
        }));
    }
};
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    yield render();
    formEvent();
}));
// with db
// getTransactions
// postTransaction
// deleteTransaction
// uiFuncs () => { deleteTransaction }
// onLoad () => { getTransactions(), uiFuncs() }
