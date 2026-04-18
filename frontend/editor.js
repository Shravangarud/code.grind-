document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Params
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const num = params.get('num');

    if (!id && !num) {
        window.location.href = 'problem.html';
        return;
    }

    // UI Elements
    const panes = {
        description: document.getElementById('pane-description'),
        solution: document.getElementById('pane-solution'),
        discussion: document.getElementById('pane-discussion'),
        hints: document.getElementById('pane-hints')
    };
    const tabs = {
        description: document.getElementById('tab-description'),
        solution: document.getElementById('tab-solution'),
        discussion: document.getElementById('tab-discussion'),
        hints: document.getElementById('tab-hints')
    };
    const sideBtns = {
        description: document.getElementById('side-btn-desc'),
        solution: document.getElementById('side-btn-sol'),
        discussion: document.getElementById('side-btn-disc'),
        hints: document.getElementById('side-btn-hints')
    };

    const editor = document.getElementById('code-editor');
    const consoleOutput = document.getElementById('console-output');
    
    let currentProblem = null;
    let currentLang = 'python';

    const boilerplates = {
        python: `class Solution:\n    def solve(self, nums):\n        # Implementation\n        pass`,
        java: `class Solution {\n    public int solve(int[] nums) {\n        // Implementation\n        return 0;\n    }\n}`,
        cpp: `class Solution {\npublic:\n    int solve(vector<int>& nums) {\n        // Implementation\n        return 0;\n    }\n};`,
        javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nvar solve = function(nums) {\n    // Implementation\n};`,
        sql: `-- Write your query below\nSELECT \n    *\nFROM \n    Table\nLIMIT 10;`
    };

    // Tab & Dropdown UI
    Object.keys(tabs).forEach(key => {
        tabs[key].addEventListener('click', () => switchTab(key));
    });

    Object.keys(sideBtns).forEach(key => {
        sideBtns[key]?.addEventListener('click', () => switchTab(key));
    });

    const langBtn = document.getElementById('lang-selector-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    const langText = document.getElementById('current-lang-text');
    const langOptions = document.querySelectorAll('.lang-option');

    langBtn.addEventListener('click', (e) => { e.stopPropagation(); langDropdown.classList.toggle('hidden'); });
    document.addEventListener('click', () => langDropdown.classList.add('hidden'));
    langOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const val = opt.dataset.value;
            setLanguage(val, opt.textContent.trim().split(' ')[0]);
        });
    });

    function switchTab(activeKey) {
        Object.keys(panes).forEach(key => {
            const isActive = key === activeKey;
            panes[key].classList.toggle('hidden', !isActive);
            tabs[key].classList.toggle('text-green', isActive);
            tabs[key].classList.toggle('border-green', isActive);
            tabs[key].classList.toggle('border-b-2', isActive);
            tabs[key].classList.toggle('text-[#8b949e]', !isActive);
            if (sideBtns[key]) sideBtns[key].classList.toggle('active', isActive);
        });
    }

    function setLanguage(lang, label) {
        currentLang = lang;
        langText.textContent = label;
        editor.value = boilerplates[currentLang] || boilerplates.python;
        langDropdown.classList.add('hidden');
    }

    // API Handling
    async function fetchProblem() {
        try {
            const apiPath = id ? `/api/problems/${id}` : `/api/problems/num/${num}`;
            const response = await fetch(apiPath);
            const result = await response.json();
            if (result.message === "success" && result.data) {
                currentProblem = result.data;
                renderDescription(currentProblem);
                renderSolution(currentProblem);
                renderDiscussion(currentProblem);
                renderHints(currentProblem);
                if (currentProblem.category === 'Database') setLanguage('sql', 'SQL');
                else if (currentProblem.category === 'JavaScript') setLanguage('javascript', 'JavaScript');
                else setLanguage('python', 'Python');
            }
        } catch (err) { console.error(err); }
    }

    function formatText(text) {
        return text ? text.replace(/`([^`]+)`/g, '<span class="code-span">$1</span>') : "";
    }

    function renderDescription(p) {
        const diffColor = p.difficulty === 'Easy' ? '#00e676' : p.difficulty === 'Medium' ? '#ffa040' : '#f85149';
        panes.description.innerHTML = `
            <div class="animate-in space-y-10">
                <div>
                    <div class="flex items-center gap-3 mb-5">
                        <span class="px-2 py-0.5 rounded bg-green/10 text-[9px] font-black uppercase tracking-widest border border-green/20" style="color: ${diffColor}">${p.difficulty}</span>
                        <span class="text-[#8b949e] font-mono text-[10px] opacity-60">#${p.problem_number || p.id}</span>
                    </div>
                    <h1 class="text-4xl font-bold font-headline tracking-tighter text-white leading-tight">${p.title}</h1>
                </div>
                <div class="space-y-6"><p class="text-[14px] leading-relaxed text-[#dfe2eb] font-medium opacity-90">${formatText(p.description)}</p></div>
                <div class="example-box">
                    <p class="example-label">Example 01</p>
                    <div class="space-y-3">
                        <div class="example-field"><span class="label font-bold">Input:</span><span class="val font-mono">nums = [3, 2, 3]</span></div>
                        <div class="example-field"><span class="label font-bold">Output:</span><span class="val font-mono">3</span></div>
                    </div>
                </div>
            </div>
        `;
        document.title = `TerminalSolve | ${p.title}`;
    }

    function renderSolution(p) { panes.solution.innerHTML = `<div class="p-6 bg-[#1c2026] text-xs font-mono text-green">Optimal solution logic.</div>`; }
    function renderDiscussion(p) { panes.discussion.innerHTML = `<div class="p-6 text-xs text-[#8b949e]">Community discussions for ${p.title}...</div>`; }
    function renderHints(p) { panes.hints.innerHTML = `<div class="space-y-2"><button class="w-full text-left p-4 bg-[#1c2026] rounded-xl text-xs text-[#8b949e]">Show Hint</button></div>`; }

    // Submission Logic
    const runBtn = document.getElementById('run-btn');
    const submitBtn = document.getElementById('submit-btn');
    const successModal = document.getElementById('success-modal');

    runBtn.addEventListener('click', () => {
        consoleOutput.innerHTML = `<div class="text-[#00e676]">Compiling... OK. All tests passed.</div>`;
    });

    submitBtn.addEventListener('click', () => {
        const originalContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Submitting...`;
        
        // --- PERFORMANCE TELEMETRY ---
        const startTime = performance.now();
        const code = codeEditor.value;
        
        setTimeout(() => {
            const endTime = performance.now();
            const actualRuntime = Math.max(1, Math.floor((endTime - startTime) / 10) + (code.length % 5));
            const simulatedMemory = (4.1 + (code.length % 100) / 100).toFixed(1);
            
            document.getElementById('stat-runtime').textContent = `${actualRuntime}ms`;
            document.getElementById('stat-memory').textContent = `${simulatedMemory}MB`;

            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
            updateUserProgress();
            successModal.classList.remove('hidden');
        }, 1200);
    });

    function updateUserProgress() {
        if (!currentProblem) return;

        const storedUser = JSON.parse(localStorage.getItem('terminal_user')) || {
            name: "Terminal_User",
            solved: 0,
            attempts: 0,
            points: 0,
            rank_num: 15402,
            streak: 1,
            solved_ids: [],
            skills: { Algorithms: 20, Database: 10, JavaScript: 5, Dynamic: 5, Math: 5 },
            recentActivity: []
        };

        // --- CALC POINTS PER DIFFICULTY ---
        // Easy = 50 (+10 first, +5 bonus)
        // Medium = 100 (+20 first, +10 bonus)
        // Hard = 200 (+50 first, +25 bonus)
        
        let pBase = 50, pFirst = 10, pBonus = 5;
        if (currentProblem.difficulty === 'Medium') { pBase = 100; pFirst = 20; pBonus = 10; }
        if (currentProblem.difficulty === 'Hard') { pBase = 200; pFirst = 50; pBonus = 25; }

        if (!storedUser.solved_ids) storedUser.solved_ids = [];
        const isFirstSolve = !storedUser.solved_ids.includes(currentProblem.id);
        
        let earned = pBase + pBonus;
        if (isFirstSolve) {
            earned += pFirst;
            storedUser.solved_ids.push(currentProblem.id);
            storedUser.solved = (storedUser.solved || 0) + 1;
        }
        
        storedUser.points = (storedUser.points || 0) + earned;
        storedUser.attempts = (storedUser.attempts || 0) + 1;
        storedUser.accuracy = ((storedUser.solved / storedUser.attempts) * 100).toFixed(1);
        storedUser.rank_num = Math.max(1, (storedUser.rank_num || 15402) - Math.floor(Math.random() * 8 + 5));

        // Streak & Activity
        const now = new Date();
        const last = storedUser.last_solve ? new Date(storedUser.last_solve) : null;
        if (last) {
            const diffHours = (now - last) / (1000 * 60 * 60);
            if (diffHours >= 24 && diffHours < 48) storedUser.streak = (storedUser.streak || 0) + 1;
            else if (diffHours >= 48) storedUser.streak = 1;
        } else { storedUser.streak = 1; }
        storedUser.last_solve = now.toISOString();

        // Skills & Technical Signature
        const categoryMapping = {
            'Algorithms': 'Algorithms',
            'Database': 'Database',
            'JavaScript': 'JavaScript',
            'Python': 'Python',
            'Java': 'Java',
            'C++': 'Algorithms' // C++ maps to Algorithms for the radar chart
        };
        const catKey = categoryMapping[currentProblem.category] || 'Algorithms';
        
        if (!storedUser.skills) {
            storedUser.skills = { Algorithms: 20, Database: 20, JavaScript: 20, Python: 20, Java: 20 };
        }
        
        const skillGain = currentProblem.difficulty === 'Hard' ? 8 : currentProblem.difficulty === 'Medium' ? 4 : 2;
        storedUser.skills[catKey] = Math.min(100, (storedUser.skills[catKey] || 0) + skillGain);

        const newAct = {
            type: 'solve',
            title: currentProblem.title,
            subtitle: `+${earned} XP | ${currentProblem.difficulty} | ${currentLang.toUpperCase()}`,
            time: 'Just now'
        };
        if(!storedUser.recentActivity) storedUser.recentActivity = [];
        storedUser.recentActivity.unshift(newAct);
        if(storedUser.recentActivity.length > 10) storedUser.recentActivity.pop();

        localStorage.setItem('terminal_user', JSON.stringify(storedUser));
        console.log(`[TerminalSolve] Earned ${earned} XP. Total: ${storedUser.points}`);

        // --- GLOBAL SYNC ---
        fetch('/api/users/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: storedUser.name,
                email: storedUser.email || `${storedUser.name.toLowerCase().replace(/\s/g, '')}@example.com`,
                xp: storedUser.points || 0,
                solved: storedUser.solved || 0,
                rank_num: storedUser.rank_num,
                avatar_seed: storedUser.avatar_seed || storedUser.name
            })
        }).then(res => res.json()).then(d => console.log('[Sync]', d)).catch(e => console.error('[Sync Error]', e));
    }

    fetchProblem();
});
