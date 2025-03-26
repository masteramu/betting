document.addEventListener('DOMContentLoaded', function() {
    // Load bank accounts
    loadBankAccounts();
    
    // Load transaction history
    loadTransactionHistory();
    
    // Form submissions
    document.getElementById('depositForm')?.addEventListener('submit', handleDeposit);
    document.getElementById('withdrawForm')?.addEventListener('submit', handleWithdrawal);
    document.getElementById('bankAccountForm')?.addEventListener('submit', handleBankAccount);
});

function loadBankAccounts() {
    // Simulated bank accounts
    const bankAccounts = [
        { id: 1, name: 'HDFC Bank', account: 'XXXXXX7890' }
    ];
    
    const bankAccountSelect = document.getElementById('bankAccount');
    if (bankAccountSelect) {
        bankAccountSelect.innerHTML = '<option value="">Select Bank Account</option>';
        
        bankAccounts.forEach(account => {
            const option = document.createElement('option');
            option.value = account.id;
            option.textContent = `${account.name} (${account.account})`;
            bankAccountSelect.appendChild(option);
        });
    }
}

function loadTransactionHistory() {
    // Simulated transactions
    const transactions = [
        { date: 'Apr 10, 2023', description: 'Deposit', amount: '₹1000.00', status: 'Completed' },
        { date: 'Apr 5, 2023', description: 'Withdrawal', amount: '₹500.00', status: 'Processing' },
        { date: 'Apr 1, 2023', description: 'Bet Won - IND vs AUS', amount: '₹925.00', status: 'Completed' }
    ];
    
    const transactionTable = document.getElementById('transactionHistory');
    if (transactionTable) {
        transactionTable.innerHTML = '';
        
        transactions.forEach(txn => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${txn.date}</td>
                <td>${txn.description}</td>
                <td class="${txn.description.includes('Deposit') || txn.description.includes('Won') ? 'text-success' : 'text-danger'}">${txn.amount}</td>
                <td><span class="badge ${txn.status === 'Completed' ? 'bg-success' : 'bg-warning'}">${txn.status}</span></td>
            `;
            transactionTable.appendChild(row);
        });
    }
}

function handleDeposit(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('depositAmount').value);
    const method = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    if (!amount || amount < 100) {
        alert('Minimum deposit amount is ₹100');
        return;
    }
    
    // Simulate deposit processing
    setTimeout(() => {
        // Update user balance
        const userData = JSON.parse(localStorage.getItem('amity_user'));
        userData.balance += amount;
        userData.totalDeposits += amount;
        localStorage.setItem('amity_user', JSON.stringify(userData));
        
        // Update UI
        updateUserInfo();
        
        // Show success message
        alert(`Deposit of ₹${amount} via ${method} initiated successfully!`);
        document.getElementById('depositForm').reset();
    }, 1000);
}

function handleWithdrawal(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    const account = document.getElementById('bankAccount').value;
    
    if (!amount || amount < 200) {
        alert('Minimum withdrawal amount is ₹200');
        return;
    }
    
    if (!account) {
        alert('Please select a bank account');
        return;
    }
    
    const userData = JSON.parse(localStorage.getItem('amity_user'));
    if (amount > userData.balance) {
        alert('Insufficient balance for this withdrawal');
        return;
    }
    
    // Simulate withdrawal processing
    setTimeout(() => {
        // Update user balance
        userData.balance -= amount;
        userData.totalWithdrawals += amount;
        localStorage.setItem('amity_user', JSON.stringify(userData));
        
        // Update UI
        updateUserInfo();
        
        // Show success message
        alert(`Withdrawal request of ₹${amount} submitted successfully! It will be processed within 24 hours.`);
        document.getElementById('withdrawForm').reset();
    }, 1000);
}

function handleBankAccount(e) {
    e.preventDefault();
    const holder = document.getElementById('accountHolder').value;
    const number = document.getElementById('accountNumber').value;
    const ifsc = document.getElementById('ifscCode').value;
    const bank = document.getElementById('bankName').value;
    
    if (!holder || !number || !ifsc || !bank) {
        alert('Please fill in all fields');
        return;
    }
    
    if (number.length < 10) {
        alert('Please enter a valid account number');
        return;
    }
    
    // Simulate bank account addition
    setTimeout(() => {
        alert(`Bank account added successfully!`);
        document.getElementById('bankAccountForm').reset();
        loadBankAccounts(); // Refresh the list
    }, 1000);
}
