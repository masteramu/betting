document.addEventListener('DOMContentLoaded', function() {
    // Load matches data
    loadMatches();
    
    // Load active bets
    loadActiveBets();
});

function loadMatches() {
    // Simulated matches data
    const matches = [
        {
            id: 1,
            teams: 'IND vs AUS',
            series: 'T20 World Cup',
            time: 'Today, 7:30 PM',
            bettingEnds: 'Today, 7:00 PM',
            status: 'live'
        },
        {
            id: 2,
            teams: 'ENG vs NZ',
            series: 'T20 World Cup',
            time: 'Tomorrow, 3:30 PM',
            bettingEnds: 'Tomorrow, 3:00 PM',
            status: 'upcoming'
        },
        {
            id: 3,
            teams: 'SA vs PAK',
            series: 'T20 World Cup',
            time: 'Apr 15, 7:30 PM',
            bettingEnds: 'Apr 15, 7:00 PM',
            status: 'upcoming'
        }
    ];
    
    const matchesTable = document.getElementById('matchesTable');
    if (matchesTable) {
        matchesTable.innerHTML = '';
        
        matches.forEach(match => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${match.teams}</strong>${match.status === 'live' ? ' <span class="badge bg-danger">LIVE</span>' : ''}</td>
                <td>${match.series}</td>
                <td>${match.time}</td>
                <td>${match.bettingEnds}</td>
                <td><a href="bet.html?id=${match.id}" class="btn btn-sm btn-primary">Bet Now</a></td>
            `;
            matchesTable.appendChild(row);
        });
    }
}

function loadActiveBets() {
    // Simulated active bets
    const activeBets = [
        // { match: 'IND vs AUS', bet: 'IND Win', amount: '₹500', potential: '₹925' }
    ];
    
    const activeBetsList = document.getElementById('activeBets');
    if (activeBetsList) {
        activeBetsList.innerHTML = '';
        
        if (activeBets.length === 0) {
            activeBetsList.innerHTML = '<li class="list-group-item text-center">No active bets</li>';
            return;
        }
        
        activeBets.forEach(bet => {
            const item = document.createElement('li');
            item.className = 'list-group-item';
            item.innerHTML = `
                <div class="d-flex justify-content-between">
                    <span class="fw-bold">${bet.match}</span>
                    <span>${bet.amount}</span>
                </div>
                <div class="d-flex justify-content-between">
                    <small class="text-muted">${bet.bet}</small>
                    <small class="text-success">Potential: ${bet.potential}</small>
                </div>
            `;
            activeBetsList.appendChild(item);
        });
    }
}
