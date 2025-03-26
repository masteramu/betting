// Wallet Functionality
document.addEventListener('DOMContentLoaded', function() {
    const depositForm = document.getElementById('depositForm');
    const withdrawForm = document.getElementById('withdrawForm');
    
    if (depositForm) {
        depositForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const amount = parseFloat(document.getElementById('depositAmount').value);
            const method = document.querySelector('input[name="paymentMethod"]:checked').value;
            
            if (amount >= 100) {
                // Simulate deposit
                alert(`Deposit request of ₹${amount.toFixed(2)} via ${method} has been initiated.`);
                this.reset();
            } else {
                alert('Minimum deposit amount is ₹100');
            }
        });
    }
    
    if (withdrawForm) {
        withdrawForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const amount = parseFloat(document.getElementById('withdrawAmount').value);
            const bankAccount = document.getElementById('bankAccount').value;
            
            if (!bankAccount) {
                alert('Please select a bank account');
                return;
            }
            
            if (amount >= 500) {
                // Simulate withdrawal
                alert(`Withdrawal request of ₹${amount.toFixed(2)} has been submitted. It will be processed within 24 hours.`);
                this.reset();
            } else {
                alert('Minimum withdrawal amount is ₹500');
            }
        });
    }
});
