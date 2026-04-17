document.addEventListener('DOMContentLoaded', () => {
    // 1. User Data Initialization
    const defaultUser = {
        name: "Terminal_User",
        rank: "Senior Dev",
        tier: "Platinum",
        location: "System.IO",
        bio: "TerminalSolve Developer | Competitive Coder. Optimizing algorithms by day, grinding ladders by night. O(1) or bust.",
        solved: 0,
        streak: 0,
        rank_num: 15402,
        accuracy: 0,
        points: 0,
        avatar_seed: "Terminal_User",
        customAvatar: null,
        recentActivity: [],
        skills: { Algorithms: 60, Database: 40, JavaScript: 30, Dynamic: 20, Math: 50 }
    };

    let storedUser = JSON.parse(localStorage.getItem('terminal_user')) || defaultUser;
    
    // 2. Hydrate UI Elements
    const elements = {
        sideUsername: document.getElementById('side-username'),
        sideRank: document.getElementById('side-rank'),
        sideAvatar: document.getElementById('side-avatar'),
        mainUsername: document.getElementById('main-username'),
        mainAvatar: document.getElementById('main-avatar'),
        statPoints: document.getElementById('stat-points'),
        location: document.getElementById('location-text'),
        bio: document.getElementById('bio-text'),
        statSolved: document.getElementById('stat-solved'),
        statStreak: document.getElementById('stat-streak'),
        statRank: document.getElementById('stat-rank'),
        statAccuracy: document.getElementById('stat-accuracy'),
        activityList: document.getElementById('recent-activity-list'),
        skillPolygon: document.getElementById('skill-polygon'),
        avatarInput: document.getElementById('avatar-input'),
        avatarOverlay: document.getElementById('avatar-overlay'),
        tierBadge: document.getElementById('tier-badge'),
        tierName: document.getElementById('tier-name'),
        tierIcon: document.getElementById('tier-icon'),
        tierStars: document.getElementById('tier-stars')
    };

    // Core Identity
    if(elements.sideUsername) elements.sideUsername.textContent = storedUser.name;
    if(elements.mainUsername) elements.mainUsername.textContent = storedUser.name;
    if(elements.statSolved) elements.statSolved.textContent = storedUser.solved || 0;
    if(elements.statStreak) elements.statStreak.textContent = `${storedUser.streak || 0} Days`;
    if(elements.statRank) elements.statRank.textContent = `#${storedUser.rank_num || 0}`;
    if(elements.statAccuracy) elements.statAccuracy.textContent = `${storedUser.accuracy || 0}%`;
    if(elements.statPoints) elements.statPoints.textContent = (storedUser.points || 0).toLocaleString();
    if(elements.location) elements.location.textContent = storedUser.location || "System.IO";
    if(elements.bio) elements.bio.textContent = storedUser.bio || "TerminalSolve Developer | Competitive Coder.";

    // 3. TIER SYSTEM LOGIC (Syntax -> Compiler -> Kernel -> Architect -> Singularity)
    function updateTierSystem(pts) {
        if(!elements.tierBadge) return;
        
        const tiers = [
            { name: "Syntax", icon: "terminal", stars: 4, class: "tier-syntax" },
            { name: "Compiler", icon: "memory", stars: 4, class: "tier-compiler" },
            { name: "Kernel", icon: "developer_board", stars: 5, class: "tier-kernel" },
            { name: "Architect", icon: "architecture", stars: 7, class: "tier-architect" },
            { name: "Singularity", icon: "all_inclusive", stars: 7, class: "tier-singularity" }
        ];

        let currentTierIndex = 0;
        let cumulativePoints = 0;
        let activeTier = tiers[0];
        let starCount = 0;

        // Calculate Tier & Stars
        // Each star = 200 pts
        for (let i = 0; i < tiers.length; i++) {
            const tierMaxPoints = tiers[i].stars * 200;
            if (pts > cumulativePoints + tierMaxPoints) {
                cumulativePoints += tierMaxPoints;
                if(i < tiers.length - 1) currentTierIndex = i + 1;
            } else {
                activeTier = tiers[i];
                starCount = Math.floor((pts - cumulativePoints) / 200);
                break;
            }
            if(i === tiers.length - 1) { // Maxed out
                activeTier = tiers[i];
                starCount = tiers[i].stars;
            }
        }

        // Apply UI
        elements.tierName.textContent = `${activeTier.name} Tier`;
        elements.tierIcon.textContent = activeTier.icon;
        
        // Remove all previous tier classes
        tiers.forEach(t => elements.tierBadge.classList.remove(t.class));
        elements.tierBadge.classList.add(activeTier.class);

        // Render Stars
        let starHtml = '';
        for (let s = 1; s <= activeTier.stars; s++) {
            const isFilled = s <= starCount;
            starHtml += `<span class="material-symbols-outlined ${isFilled ? 'star-on' : 'star-off'}">star</span>`;
        }
        elements.tierStars.innerHTML = starHtml;
    }

    updateTierSystem(storedUser.points || 0);

    // 4. Avatars (Custom Photo or Generated)
    function updateAvatarUI() {
        const finalSource = storedUser.customAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${storedUser.avatar_seed || storedUser.name}`;
        if(elements.sideAvatar) elements.sideAvatar.src = finalSource;
        if(elements.mainAvatar) elements.mainAvatar.src = finalSource;
    }
    updateAvatarUI();

    // 5. Avatar Upload Logic
    if(elements.avatarOverlay && elements.avatarInput) {
        elements.avatarOverlay.addEventListener('click', () => elements.avatarInput.click());
        elements.avatarInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if(file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    storedUser.customAvatar = event.target.result;
                    localStorage.setItem('terminal_user', JSON.stringify(storedUser));
                    updateAvatarUI();
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 6. Dynamic Skill Matrix
    function updateSkillMatrix(skills) {
        if(!elements.skillPolygon || !skills) return;
        const center = 50, maxR = 40;
        const angles = [-Math.PI/2, -Math.PI/10, 3*Math.PI/10, 7*Math.PI/10, 11*Math.PI/10];
        const skillKeys = ['Algorithms', 'Database', 'JavaScript', 'Python', 'Java']; // Matching expanded categories
        const points = angles.map((angle, i) => {
            // Use 20 as base floor so triangle is visible
            const skillLevel = Math.max(20, (skills[skillKeys[i]] || 0)) / 100;
            const r = skillLevel * maxR;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return `${x},${y}`;
        }).join(' ');
        elements.skillPolygon.setAttribute('points', points);
    }
    updateSkillMatrix(storedUser.skills);

    // 7. Activity Feed
    function renderActivity(activity) {
        if(!elements.activityList) return;
        if(activity && activity.length > 0) {
            elements.activityList.innerHTML = activity.map(act => `
                <div class="p-4 flex items-center justify-between hover:bg-white/5 transition-all group">
                     <div class="flex items-center gap-4">
                         <div class="w-8 h-8 rounded-lg bg-green/10 text-green flex items-center justify-center text-xs"><span class="material-symbols-outlined text-sm">check_circle</span></div>
                         <div><h4 class="text-[11px] font-bold text-white">${act.title}</h4><p class="text-[9px] text-text-muted">${act.subtitle}</p></div>
                     </div>
                     <span class="text-[9px] text-[#8492a6]">${act.time}</span>
                </div>
            `).join('');
        }
    }
    renderActivity(storedUser.recentActivity || []);
});
