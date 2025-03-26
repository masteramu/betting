// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem('amity_token');
    if (token && window.location.pathname.endsWith('index.html')) {
        window.location.href = 'dashboard.html';
    } else if (!token && !window.location.pathname.endsWith('index.html')) {
        window.location.href = 'index.html';
    }
}

// Login functionality
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        localStorage.setItem('amity_token', 'simulated_token');
        localStorage.setItem('amity_user', JSON.stringify({
            name: 'Test User',
            email: email,
            balance: 1000,
            totalDeposits: 1500,
            totalWithdrawals: 500,
            totalWinnings: 925,
            totalBets: 3
        }));
        window.location.href = 'dashboard.html';
    }, 1000);
});

// Registration functionality
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const termsChecked = document.getElementById('termsCheck').checked;
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (!termsChecked) {
        alert('You must agree to the terms and conditions');
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        localStorage.setItem('amity_token', 'simulated_token');
        localStorage.setItem('amity_user', JSON.stringify({
            name: name,
            email: email,
            balance: 0,
            totalDeposits: 0,
            totalWithdrawals: 0,
            totalWinnings: 0,
            totalBets: 0
        }));
        window.location.href = 'dashboard.html';
    }, 1000);
});

// Logout functionality
document.getElementById('logoutBtn')?.addEventListener('click', function() {
    localStorage.removeItem('amity_token');
    localStorage.removeItem('amity_user');
    window.location.href = 'index.html';
});

// Update user info in navbar
function updateUserInfo() {
    const userData = JSON.parse(localStorage.getItem('amity_user'));
    if (userData) {
        const userBalanceElements = document.querySelectorAll('#userBalance, #currentBalance, #walletBalance');
        userBalanceElements.forEach(el => {
            if (el) el.textContent = `₹${userData.balance.toFixed(2)}`;
        });
        
        // Update wallet summary if on wallet page
        if (document.getElementById('totalDeposits')) {
            document.getElementById('totalDeposits').textContent = `₹${userData.totalDeposits.toFixed(2)}`;
            document.getElementById('totalWithdrawals').textContent = `₹${userData.totalWithdrawals.toFixed(2)}`;
            document.getElementById('totalWinnings').textContent = `₹${userData.totalWinnings.toFixed(2)}`;
            document.getElementById('totalBets').textContent = userData.totalBets;
        }
        
        // Update dashboard stats if on dashboard
        if (document.getElementById('totalBetsStat')) {
            document.getElementById('totalBetsStat').textContent = userData.totalBets;
            const winRate = userData.totalBets > 0 ? Math.round((userData.totalWinnings / (userData.totalBets * 100)) * 100) : 0;
            document.getElementById('winRateStat').textContent = `${winRate}%`;
            document.getElementById('totalWinningsStat').textContent = `₹${userData.totalWinnings.toFixed(2)}`;
            
            // Update progress bars
            document.querySelectorAll('.progress-bar').forEach((bar, index) => {
                if (index === 0) bar.style.width = `${Math.min(100, userData.totalBets * 10)}%`;
                if (index === 1) bar.style.width = `${winRate}%`;
                if (index === 2) bar.style.width = `${Math.min(100, userData.totalWinnings / 50)}%`;
            });
        }
    }
}

// Initialize auth check on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    updateUserInfo();
    
    // Payment method toggle
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    if (paymentMethods.length > 0) {
        paymentMethods.forEach(method => {
            method.addEventListener('change', function() {
                document.getElementById('upiField').style.display = this.value === 'upi' ? 'block' : 'none';
            });
        });
    }
});
