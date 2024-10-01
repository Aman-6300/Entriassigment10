let totalIncome = 0;
let totalExpenses = 0;
let expenses = [];
let sortDirection = 'asc';

document.getElementById('income-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const incomeAmount = parseFloat(document.getElementById('income-amount').value);
    totalIncome += incomeAmount;
    updateBudgetSummary();
    this.reset();
    showToast('Income added successfully!', 'bg-success');
});

document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const expenseDescription = document.getElementById('expense-description').value;
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
    const expenseCategory = document.getElementById('expense-category').value;

    totalExpenses += expenseAmount;
    updateBudgetSummary();

    const expense = { description: expenseDescription, amount: expenseAmount, category: expenseCategory };
    expenses.push(expense);

    updateExpenseTable();
    this.reset();
    showToast('Expense added successfully!', 'bg-danger');
});

function updateBudgetSummary() {
    document.getElementById('total-income').textContent = totalIncome.toFixed(2);
    document.getElementById('total-expenses').textContent = totalExpenses.toFixed(2);
    const remainingBudget = totalIncome - totalExpenses;
    document.getElementById('remaining-budget').textContent = remainingBudget.toFixed(2);
    const remainingBudgetContainer = document.getElementById('remaining-budget-container');
    remainingBudgetContainer.className = remainingBudget >= 0 ? 'text-success' : 'text-danger';
}

function updateExpenseTable(filteredExpenses = expenses) {
    const expenseTableBody = document.getElementById('expense-table-body');
    expenseTableBody.innerHTML = '';

    filteredExpenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.description}</td>
            <td>${expense.category}</td>
            <td>₹${expense.amount.toFixed(2)}</td>
        `;
        expenseTableBody.appendChild(row);
    });
}

function filterExpenses() {
    const filterCategory = document.getElementById('filter-category').value;
    const filteredExpenses = filterCategory ? expenses.filter(expense => expense.category === filterCategory) : expenses;
    updateExpenseTable(filteredExpenses);
}

function sortExpenses() {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    const sortedExpenses = [...expenses].sort((a, b) => sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount);
    updateExpenseTable(sortedExpenses);

    document.getElementById('sort-icon').textContent = sortDirection === 'asc' ? '⬇️' : '⬆️';
}

function showToast(message, bgClass) {
    const toastContainer = document.createElement('div');
    toastContainer.style.position = 'fixed';
    toastContainer.style.top = '20px';
    toastContainer.style.right = '20px';
    toastContainer.style.zIndex = '1050';
    
    const toastElement = document.createElement('div');
    toastElement.className = `toast ${bgClass} text-white`;
    toastElement.setAttribute('role', 'alert');
    toastElement.setAttribute('aria-live', 'assertive');
    toastElement.setAttribute('aria-atomic', 'true');
    
    toastElement.innerHTML = `
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    toastContainer.appendChild(toastElement);
    document.body.appendChild(toastContainer);
    
    const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 3000 });
    toast.show();
    
    toastElement.addEventListener('hidden.bs.toast', function () {
        document.body.removeChild(toastContainer);
    });
}
