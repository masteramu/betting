// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Timer functionality for betting countdown
    function updateTimers() {
        const timers = document.querySelectorAll('.timer');
        
        timers.forEach(timer => {
            const endTime = new Date(timer.dataset.end).getTime();
            const now = new Date().getTime();
            const distance = endTime - now;
            
            if (distance < 0) {
                timer.textContent = "Betting Closed";
                timer.parentElement.parentElement.querySelector('.bet-options').innerHTML = '<button class="bet-btn" disabled>Betting Closed</button>';
                return;
            }
            
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            timer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        });
    }
    
    // Update timers every second
    setInterval(updateTimers, 1000);
    updateTimers();
    
    // Bet Now button functionality
    const betButtons = document.querySelectorAll('.bet-btn:not([disabled])');
    const betModal = document.getElementById('betModal');
    const closeModal = document.querySelector('.close');
    
    if (betButtons.length > 0) {
        betButtons.forEach(button => {
            button.addEventListener('click', function() {
                const teamName = this.dataset.team === 'teamA' ? 'Team A' : 
                                this.dataset.team === 'teamB' ? 'Team B' :
                                this.dataset.team === 'teamC' ? 'Team C' : 'Team D';
                const odds = this.textContent.match(/\(([^)]+)\)/)[1];
                
                document.getElementById('selectedTeamName').textContent = teamName;
                document.getElementById('selectedTeamOdds').textContent = odds;
                
                // Calculate potential win on amount change
                const betAmountInput = document.getElementById('betAmount');
                betAmountInput.addEventListener('input', function() {
                    const potentialWin = (this.value * odds).toFixed(2);
                    document.getElementById('potentialWin').textContent = potentialWin;
                });
                
                // Initial calculation
                const initialWin = (betAmountInput.value * odds).toFixed(2);
                document.getElementById('potentialWin').textContent = initialWin;
                
                betModal.style.display = 'block';
            });
        });
    }
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            betModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === betModal) {
            betModal.style.display = 'none';
        }
    });
    
    // Tab functionality for wallet page
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                
                // Update active tab button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding tab pane
                tabPanes.forEach(pane => pane.classList.remove('active'));
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Show register form
    const showRegister = document.getElementById('show-register');
    if (showRegister) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('login-btn').textContent = 'Register';
            document.getElementById('loginForm').innerHTML = `
                <h2>Create New Account</h2>
                <form id="registerForm">
                    <div class="form-group">
                        <input type="text" id="fullName" placeholder="Full Name" required>
                    </div>
                    <div class="form-group">
                        <input type="email" id="regEmail" placeholder="Email" required>
                    </div>
                    <div class="form-group">
                        <input type="password" id="regPassword" placeholder="Password" required>
                    </div>
                    <div class="form-group">
                        <input type="password" id="confirmPassword" placeholder="Confirm Password" required>
                    </div>
                    <button type="submit" class="btn">Register</button>
                </form>
                <div class="form-footer">
                    <p>Already have an account? <a href="#" id="show-login">Login here</a></p>
                </div>
            `;
            
            // Add event listener for show login
            document.getElementById('show-login').addEventListener('click', function(e) {
                e.preventDefault();
                location.reload();
            });
        });
    }
});
