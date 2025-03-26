// Login Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simulate authentication
            if (email && password) {
                // In a real app, you would make an API call here
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                window.location.href = 'dashboard.html';
            } else {
                alert('Please enter both email and password');
            }
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (fullName && email && password) {
                // Simulate registration
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userName', fullName);
                window.location.href = 'dashboard.html';
            } else {
                alert('Please fill in all fields');
            }
        });
    }
    
    // Check if user is logged in
    if (localStorage.getItem('isLoggedIn') {
        const userEmail = localStorage.getItem('userEmail');
        const userName = localStorage.getItem('userName') || 'User';
        
        // Update UI for logged in user
        const authButtons = document.querySelector('.auth-buttons');
        if (authButtons) {
            authButtons.innerHTML = `
                <div class="user-info">
                    <span class="balance">₹5,000.00</span>
                    <div class="user-avatar">
                        <span>${userName.charAt(0).toUpperCase()}</span>
                    </div>
                </div>
            `;
        }
    }
});
