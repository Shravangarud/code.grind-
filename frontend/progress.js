document.addEventListener('DOMContentLoaded', () => {
    // 1. Generate empty/placeholder Heatmap Grid
    const heatmapContainer = document.querySelector('.grid-flow-col');
    if (heatmapContainer) {
        heatmapContainer.innerHTML = '';
        for (let i = 0; i < 364; i++) {
            // Create default empty state cells
            const cell = document.createElement('div');
            cell.className = 'w-3 h-3 rounded-sm bg-surface-container-highest';
            cell.style.opacity = '1';
            heatmapContainer.appendChild(cell);
        }
    }

    // 2. Clear out Terminal History Table
    const historyBody = document.getElementById('progress-history-body');
    if (historyBody) {
        historyBody.innerHTML = `
            <tr>
                <td colspan="5" class="px-8 py-12 text-center text-[#8b949e] font-mono text-xs">
                    No recent submissions found. Deploy code to start tracking history!
                </td>
            </tr>
        `;
    }

    // You can dynamically fetch and populate user stats here in the future:
    // fetch('/api/user/progress').then(...).catch(...)
});
