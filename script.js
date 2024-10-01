let totalIncome = 0;
let totalExpenses = 0;

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
    addExpenseToList(expenseDescription, expenseAmount, expenseCategory);
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

function addExpenseToList(description, amount, category) {
    const expenseList = document.getElementById('expense-list');
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        <div>
            <strong>${description}</strong>
            <span class="badge bg-secondary ms-2">${category}</span>
        </div>
        <span class="badge bg-danger rounded-pill">$${amount.toFixed(2)}</span>
    `;
    expenseList.appendChild(li);
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
