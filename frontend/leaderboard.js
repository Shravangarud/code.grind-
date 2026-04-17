document.addEventListener('DOMContentLoaded', () => {
    const podiumArea = document.getElementById('podium-area');
    const podiumLoading = document.getElementById('podium-loading');
    const lbBody = document.getElementById('lb-body');

    async function fetchLeaderboard() {
        try {
            const res = await fetch('/api/leaderboard');
            const result = await res.json();

            if (result.message === 'success') {
                const users = result.data;
                renderLeaderboard(users);
            }
        } catch (err) {
            console.error('Leaderboard Fetch Error:', err);
            lbBody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 40px; color: #f85149">Failed to sync global leaderboard. Please check your connection.</td></tr>`;
        }
    }

    function renderLeaderboard(users) {
        podiumLoading.style.display = 'none';
        
        if (users.length === 0) {
            lbBody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 40px; color: #8b949e">No active developers found in the global archive. Start solving to be the first!</td></tr>`;
            return;
        }

        podiumArea.style.display = 'flex';
        
        // 1. Render Top 3 Podium
        const top3 = users.slice(0, 3);
        // Order for visual podium: 2, 1, 3
        const displayOrder = [];
        if (top3[1]) displayOrder.push({ ...top3[1], rank: 2 });
        if (top3[0]) displayOrder.push({ ...top3[0], rank: 1 });
        if (top3[2]) displayOrder.push({ ...top3[2], rank: 3 });

        podiumArea.innerHTML = displayOrder.map(u => `
            <div class="podium-card podium-${u.rank}">
                <div class="rank-badge badge-${u.rank}">${u.rank}</div>
                <div class="avatar-wrap">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${u.avatar_seed || u.name}" style="width:100%; height:100%">
                </div>
                <div class="podium-name">${u.name}</div>
                <div class="podium-xp">${u.xp.toLocaleString()} XP</div>
                <div class="podium-solved">${u.solved} Problems Solved</div>
            </div>
        `).join('');

        // 2. Render List (the rest)
        const rest = users.slice(3);
        if (rest.length === 0 && users.length <= 3) {
            // If only 1-3 users, list is empty
        } else {
            lbBody.innerHTML = rest.map((u, i) => `
                <tr class="lb-row">
                    <td class="col-rank">#${i + 4}</td>
                    <td>
                        <div class="col-user">
                            <img class="lb-avatar" src="https://api.dicebear.com/7.x/avataaars/svg?seed=${u.avatar_seed || u.name}">
                            <span class="lb-name">${u.name}</span>
                        </div>
                    </td>
                    <td class="col-solved">${u.solved}</td>
                    <td class="col-xp">${u.xp.toLocaleString()} XP</td>
                </tr>
            `).join('');
        }
    }

    fetchLeaderboard();
});
