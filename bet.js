document.addEventListener('DOMContentLoaded', function() {
    // Load match data based on URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const matchId = urlParams.get('id');
    
    loadMatchDetails(matchId);
    
    // Bet amount change handlers
    document.querySelectorAll('.bet-amount').forEach(input => {
        input.addEventListener('input', updatePotentialWin);
    });
    
    // Bet now button handlers
    document.querySelectorAll('.bet-now').forEach(button => {
        button.addEventListener('click', addToBetSlip);
    });
    
    // Place bets button handler
    document.getElementById('placeBetsBtn')?.addEventListener('click', placeBets);
    
    // Countdown timer for betting end
    startBettingCountdown();
});

function loadMatchDetails(matchId) {
    // Simulated match data
    const matches = {
        '1': {
            title: 'IND vs AUS - T20 World Cup',
            team1: 'India',
            team2: 'Australia',
            time: 'Today, 7:30 PM',
            bettingEnds: 'Today, 7:00 PM'
        },
        '2': {
            title: 'ENG vs NZ - T20 World Cup',
            team1: 'England',
            team2: 'New Zealand',
            time: 'Tomorrow, 3:30 PM',
            bettingEnds: 'Tomorrow, 3:00 PM'
        },
        '3': {
            title: 'SA vs PAK - T20 World Cup',
            team1: 'South Africa',
            team2: 'Pakistan',
            time: 'Apr 15, 7:30 PM',
            bettingEnds: 'Apr 15, 7:00 PM'
        }
    };
    
    const match = matches[matchId] || matches['1'];
    
    if (document.getElementById('matchTitle')) {
        document.getElementById('matchTitle').textContent = match.title;
        document.getElementById('team1Name').textContent = match.team1;
        document.getElementById('team2Name').textContent = match.team2;
        document.getElementById('team1NameShort').textContent = match.team1.substring(0, 3).toUpperCase();
        document.getElementById('team2NameShort').textContent = match.team2.substring(0, 3).toUpperCase();
        document.getElementById('matchTime').textContent = match.time;
    }
}

function updatePotentialWin(e) {
    const amount = parseFloat(e.target.value) || 0;
    const row = e.target.closest('tr');
    const odds = parseFloat(row.querySelector('td:nth-child(2)').textContent);
    const potentialWinCell = row.querySelector('td:nth-child(4)');
    
    const potentialWin = amount * odds;
    potentialWinCell.textContent = `₹${potentialWin.toFixed(2)}`;
}

function addToBetSlip(e) {
    const row = e.target.closest('tr');
    const option = row.querySelector('td:nth-child(1)').textContent;
    const odds = row.querySelector('td:nth-child(2)').textContent;
    const amountInput = row.querySelector('.bet-amount');
    const amount = parseFloat(amountInput.value) || 0;
    
    if (amount < 10) {
        alert('Minimum bet amount is ₹10');
        return;
    }
    
    const betSlip = document.getElementById('betSlip');
    const existingBets = betSlip.querySelectorAll('.bet-item');
    
    // Check if this bet already exists
    for (let bet of existingBets) {
        if (bet.dataset.option === option) {
            alert('This bet is already in your slip');
            return;
        }
    }
    
    const potentialWin = amount * parseFloat(odds);
    
    const betItem = document.createElement('div');
    betItem.className = 'bet-item mb-2';
    betItem.dataset.option = option;
    betItem.dataset.odds = odds;
    betItem.dataset.amount = amount;
    betItem.innerHTML = `
        <div class="d-flex justify-content-between">
            <span>${option}</span>
            <button class="btn btn-sm btn-outline-danger remove-bet">×</button>
        </div>
        <div class="d-flex justify-content-between small">
            <span>Stake: ₹${amount.toFixed(2)}</span>
            <span>Odds: ${odds}</span>
        </div>
        <div class="d-flex justify-content-between small">
            <span>Potential Win:</span>
            <span class="text-success">₹${potentialWin.toFixed(2)}</span>
        </div>
    `;
    
    betSlip.appendChild(betItem);
    
    // Add remove functionality
    betItem.querySelector('.remove-bet').addEventListener('click', function() {
        betItem.remove();
        updateBetSlipTotal();
    });
    
    // Clear the input
    amountInput.value = '';
    row.querySelector('td:nth-child(4)').textContent = '₹0.00';
    
    updateBetSlipTotal();
}

function updateBetSlipTotal() {
    const betItems = document.querySelectorAll('.bet-item');
    let totalStake = 0;
    let totalPotential = 0;
    
    betItems.forEach(item => {
        totalStake += parseFloat(item.dataset.amount);
        totalPotential += parseFloat(item.dataset.amount) * parseFloat(item.dataset.odds);
    });
    
    document.getElementById('totalStake').textContent = `₹${totalStake.toFixed(2)}`;
    document.getElementById('potentialWin').textContent = `₹${totalPotential.toFixed(2)}`;
    
    // Show/hide "No bets in slip" message
    const emptyMessage = document.querySelector('#betSlip > p.text-muted');
    if (emptyMessage) {
        emptyMessage.style.display = betItems.length > 0 ? 'none' : 'block';
    }
}

function placeBets() {
    const betItems = document.querySelectorAll('.bet-item');
    if (betItems.length === 0) {
        alert('Please add bets to your slip first');
        return;
    }
    
    const userData = JSON.parse(localStorage.getItem('amity_user'));
    let totalStake = 0;
    
    betItems.forEach(item => {
        totalStake += parseFloat(item.dataset.amount);
    });
    
    if (userData.balance < totalStake) {
        alert('Insufficient balance. Please deposit more funds.');
        return;
    }
    
    // Simulate placing bets
    setTimeout(() => {
        // Update user balance
        userData.balance -= totalStake;
        userData.totalBets += betItems.length;
        localStorage.setItem('amity_user', JSON.stringify(userData));
        
        // Update active bets
        const activeBets = [];
        betItems.forEach(item => {
            activeBets.push({
                match: document.getElementById('matchTitle').textContent,
                bet: item.dataset.option,
                amount: `₹${parseFloat(item.dataset.amount).toFixed(2)}`,
                potential: `₹${(parseFloat(item.dataset.amount) * parseFloat(item.dataset.odds)).toFixed(2)}`
            });
        });
        
        alert('Your bets have been placed successfully!');
        window.location.href = 'dashboard.html';
    }, 1000);
}

function startBettingCountdown() {
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 2); // 2 hours from now
    
    function updateCountdown() {
        const now = new Date();
        const diff = endTime - now;
        
        if (diff <= 0) {
            document.getElementById('bettingEndsIn').textContent = 'Betting closed';
            return;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('bettingEndsIn').textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}
