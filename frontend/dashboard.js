document.addEventListener('DOMContentLoaded', () => {

    // ─── User Session Hydration ────────────────────────────
    const defaultUser = {
        name: "Terminal_User",
        rank: "Senior Dev",
        avatar_seed: "Terminal_User"
    };

    const storedUser = JSON.parse(localStorage.getItem('terminal_user')) || defaultUser;

    // Update Sidebar Profile
    const sidebarName = document.querySelector('aside .p-6 .font-headline.text-sm.font-bold');
    const sidebarRank = document.querySelector('aside .p-6 .font-headline.text-\\[10px\\]');
    const headerAvatar = document.querySelector('header .w-8.h-8.rounded-full img');

    if (sidebarName) sidebarName.textContent = storedUser.name;
    if (sidebarRank) sidebarRank.textContent = `Rank: ${storedUser.rank || 'New Dev'}`;
    if (headerAvatar) headerAvatar.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${storedUser.avatar_seed}`;

    // Update Welcome Message
    const welcomeMsg = document.querySelector('h1.font-headline.text-4xl');
    if (welcomeMsg) welcomeMsg.textContent = `Welcome back, ${storedUser.name.split(' ')[0]}.`;

    // ─── Inject Dynamic Styles ────────────────────────────
    const styles = document.createElement('style');
    styles.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-12px); }
            to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes growWidth {
            from { width: 0; }
        }
        @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 20px 0px rgba(0,230,118,0.15); }
            50%      { box-shadow: 0 0 30px 4px rgba(0,230,118,0.30); }
        }
        @keyframes countUp {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        @keyframes fabPop {
            0%   { transform: scale(0) rotate(-180deg); }
            70%  { transform: scale(1.1) rotate(10deg); }
            100% { transform: scale(1) rotate(0deg); }
        }

        .animate-fade-in-up {
            animation: fadeInUp 0.5s ease forwards;
            opacity: 0;
        }
        .animate-slide-in-left {
            animation: slideInLeft 0.4s ease forwards;
            opacity: 0;
        }
        .animate-grow-width {
            animation: growWidth 1s ease forwards;
        }

        /* Notification Dropdown */
        .notif-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            margin-top: 8px;
            width: 320px;
            background: #1c2026;
            border: 1px solid #30363d;
            border-radius: 8px;
            box-shadow: 0 16px 48px rgba(0,0,0,0.4);
            z-index: 100;
            display: none;
            animation: fadeInUp 0.25s ease;
        }
        .notif-dropdown.open { display: block; }
        .notif-dropdown .notif-header {
            padding: 12px 16px;
            border-bottom: 1px solid #30363d;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .notif-dropdown .notif-header span {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #dfe2eb;
        }
        .notif-dropdown .notif-header button {
            font-size: 10px;
            color: #00e676;
            font-family: 'Space Grotesk', sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            cursor: pointer;
            background: none;
            border: none;
        }
        .notif-item {
            padding: 12px 16px;
            display: flex;
            gap: 12px;
            align-items: flex-start;
            border-bottom: 1px solid #30363d20;
            transition: background 0.2s;
            cursor: pointer;
        }
        .notif-item:hover { background: #262a31; }
        .notif-item:last-child { border-bottom: none; }
        .notif-dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            background: #00e676;
            flex-shrink: 0;
            margin-top: 6px;
        }
        .notif-text {
            font-size: 11px;
            line-height: 1.5;
            color: #bacbb9;
        }
        .notif-time {
            font-size: 9px;
            color: #8b949e;
            margin-top: 4px;
        }
    `;
    document.head.appendChild(styles);

    // ─── Notification System ──────────────────────────────
    const notifBtn = document.querySelector('header button.material-symbols-outlined:first-child');
    const header = document.querySelector('header');
    
    // Create dropdown container
    const dropdown = document.createElement('div');
    dropdown.className = 'notif-dropdown';
    dropdown.innerHTML = `
        <div class="notif-header">
            <span>Notifications</span>
            <button>Mark all read</button>
        </div>
        <div class="notif-list">
            <div class="notif-item">
                <div class="notif-dot"></div>
                <div>
                    <p class="notif-text"><strong>System:</strong> Database optimization successful for partition #409.</p>
                    <p class="notif-time">2 mins ago</p>
                </div>
            </div>
            <div class="notif-item">
                <div class="notif-dot"></div>
                <div>
                    <p class="notif-text"><strong>Mentor:</strong> Your solution for 'Async Pipeline' was reviewed.</p>
                    <p class="notif-time">1 hour ago</p>
                </div>
            </div>
            <div class="notif-item">
                <div class="notif-dot" style="background: transparent"></div>
                <div>
                    <p class="notif-text">Security alert: New login detected from 192.168.1.1</p>
                    <p class="notif-time">Yesterday</p>
                </div>
            </div>
        </div>
    `;
    
    // Attach to the relative button parent locally for positioning
    notifBtn.parentNode.style.position = 'relative';
    notifBtn.parentNode.appendChild(dropdown);

    notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    });

    document.addEventListener('click', () => {
        dropdown.classList.remove('open');
    });

    // ─── Stats Counter Animation ──────────────────────────
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const statsNumbers = document.querySelectorAll('section .font-headline.text-2xl');
    statsNumbers.forEach((stat, idx) => {
        const val = parseInt(stat.innerHTML) || (idx === 0 ? storedUser.streak : idx === 1 ? storedUser.rank_num || 0 : 0);
        animateValue(stat, 0, val, 1500 + (idx * 200));
    });

    // Progress Bar and Problems Count Sync
    fetch('/api/problems')
        .then(res => res.json())
        .then(result => {
            if(result.message === 'success') {
                const total = result.data.length;
                const solved = storedUser.solved || 0;
                
                // Update Goal Text
                const goalText = document.querySelector('.p-6.bg-surface-container-low\\/50 .text-\\[11px\\]');
                if (goalText) goalText.textContent = `${solved} / ${total} Problems`;
                
                // Update Progress Bar
                const progressBar = document.querySelector('.bg-primary.w-0');
                if (progressBar) {
                    const pct = Math.min((solved / total) * 100, 100);
                    progressBar.style.width = `${pct}%`;
                }

                // Update Problems Solved Stat Card (the 3rd stat card usually)
                const statCards = document.querySelectorAll('section .font-headline.text-2xl');
                if (statCards.length >= 3) {
                    animateValue(statCards[2], 0, solved, 2000);
                }
            }
        })
        .catch(err => console.error('Dashboard sync error:', err));
}, 500);

    // ─── Interaction & Navigation ─────────────────────────
    const signoutBtn = document.querySelector('header button.font-headline');
    if(signoutBtn) {
        signoutBtn.addEventListener('click', () => {
             localStorage.removeItem('terminal_user');
             window.location.href = 'signup.html';
        });
    }

    const cards = document.querySelectorAll('.group');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent.trim();
            console.log(`[TerminalSolve] Routing to detail: ${title}`);
            // In real app, redirect to problem page
            window.location.href = 'problem.html';
        });
    });

});
