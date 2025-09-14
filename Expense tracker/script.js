const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const form = document.getElementById("transactionForm");
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const listEl = document.getElementById("transactionList");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Chart.js instance
let chart;

// Update UI
function updateUI() {
  listEl.innerHTML = "";
  let income = 0, expense = 0;

  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.classList.add(t.amount > 0 ? "income" : "expense");
    li.innerHTML = `
      ${t.desc} <span>${t.amount > 0 ? "+" : ""}₹${t.amount}</span>
      <button onclick="deleteTransaction(${index})">✕</button>
    `;
    listEl.appendChild(li);

    if (t.amount > 0) income += t.amount;
    else expense += Math.abs(t.amount);
  });

  const balance = income - expense;

  balanceEl.textContent = `₹${balance}`;
  incomeEl.textContent = `₹${income}`;
  expenseEl.textContent = `₹${expense}`;

  // Update chart
  updateChart(income, expense);

  // Save to localStorage
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Add transaction
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());

  if (desc && !isNaN(amount)) {
    transactions.push({ desc, amount });
    updateUI();
    descInput.value = "";
    amountInput.value = "";
  }
});

// Delete transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

// Chart.js setup
function updateChart(income, expense) {
  const ctx = document.getElementById("expenseChart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        data: [income, expense],
        backgroundColor: ["#4caf50", "#f44336"]
      }]
    }
  });
}

// Initial render
updateUI();
