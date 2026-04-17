document.addEventListener('DOMContentLoaded', () => {

    // ─── Element References ───────────────────────────────
    const form           = document.querySelector('form');
    const nameInput      = form.querySelector('input[type="text"]');
    const emailInput     = form.querySelector('input[type="email"]');
    const passwordInput  = form.querySelector('input[type="password"]');
    const togglePwBtn    = document.querySelector('.material-symbols-outlined');
    const termsCheckbox  = document.getElementById('terms');
    const submitBtn      = form.querySelector('button[type="submit"]');
    const socialBtns     = document.querySelectorAll('section .grid button');
    const loginLink      = document.querySelector('footer a[href="#"]');

    // ─── Inject Reusable Styles ───────────────────────────
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        .field-error {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.6rem;
            font-weight: 600;
            color: #ffb4ab;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-top: 0.35rem;
            display: none;
            animation: slideDown 0.25s ease;
        }
        .field-error.visible { display: block; }

        .strength-bar-container {
            display: flex;
            gap: 4px;
            margin-top: 0.5rem;
        }
        .strength-segment {
            height: 3px;
            flex: 1;
            background: rgba(59, 74, 61, 0.4);
            transition: background 0.3s ease;
        }

        .strength-label {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.55rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            margin-top: 0.35rem;
            transition: color 0.3s ease;
            text-align: right;
        }

        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-6px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px 0px rgba(0,230,118,0.15); }
            50%      { box-shadow: 0 0 28px 2px rgba(0,230,118,0.30); }
        }

        .input-valid {
            outline: 1px solid rgba(0, 228, 117, 0.5) !important;
        }
        .input-invalid {
            outline: 1px solid rgba(255, 180, 171, 0.5) !important;
        }

        .btn-loading {
            pointer-events: none;
            opacity: 0.85;
        }
        .btn-loading .btn-text { display: none; }
        .btn-loading .btn-spinner { display: inline-flex; }

        .btn-success {
            background: #00e676 !important;
            animation: pulse-glow 1.5s ease infinite;
        }

        .btn-spinner {
            display: none;
            align-items: center;
            gap: 8px;
        }
        .spinner-ring {
            width: 16px;
            height: 16px;
            border: 2px solid rgba(0, 57, 24, 0.3);
            border-top-color: #003918;
            border-radius: 50%;
            animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .shake {
            animation: shake 0.45s ease;
        }
        @keyframes shake {
            0%, 100%  { transform: translateX(0); }
            15%, 45%, 75% { transform: translateX(-6px); }
            30%, 60%, 90% { transform: translateX(6px); }
        }
    `;
    document.head.appendChild(dynamicStyles);

    // ─── Setup: Error Messages ────────────────────────────
    function createError(input, id) {
        const err = document.createElement('p');
        err.id = id;
        err.className = 'field-error';
        input.closest('.space-y-2').appendChild(err);
        return err;
    }
    const nameError  = createError(nameInput,  'name-error');
    const emailError = createError(emailInput, 'email-error');
    const pwError    = createError(passwordInput, 'pw-error');

    // ─── Setup: Password Strength Meter ───────────────────
    const pwFieldWrapper = passwordInput.closest('.space-y-2');

    const strengthContainer = document.createElement('div');
    strengthContainer.className = 'strength-bar-container';
    for (let i = 0; i < 4; i++) {
        const seg = document.createElement('div');
        seg.className = 'strength-segment';
        strengthContainer.appendChild(seg);
    }
    pwFieldWrapper.appendChild(strengthContainer);

    const strengthLabel = document.createElement('p');
    strengthLabel.className = 'strength-label';
    strengthLabel.style.color = 'transparent';
    pwFieldWrapper.appendChild(strengthLabel);

    // ─── Setup: Submit Button Inner HTML ──────────────────
    submitBtn.innerHTML = `
        <span class="btn-text">Create Account</span>
        <span class="btn-spinner">
            <span class="spinner-ring"></span>
            <span>INITIALIZING…</span>
        </span>
    `;

    // ─── Entrance Animations ──────────────────────────────
    const animTargets = form.querySelectorAll('.space-y-2');
    animTargets.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.animation = `fadeInUp 0.45s ease ${i * 0.1 + 0.15}s forwards`;
    });

    // ═══════════════════════════════════════════════════════
    // PASSWORD VISIBILITY TOGGLE
    // ═══════════════════════════════════════════════════════
    togglePwBtn.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        togglePwBtn.textContent = isPassword ? 'visibility_off' : 'visibility';
        togglePwBtn.style.transition = 'color 0.2s ease';
    });

    // ═══════════════════════════════════════════════════════
    // VALIDATION HELPERS
    // ═══════════════════════════════════════════════════════
    const validators = {
        name(value) {
            if (!value.trim()) return 'Name field is required';
            if (value.trim().length < 2) return 'Name must be ≥ 2 characters';
            if (!/^[a-zA-Z\s.\-']+$/.test(value.trim())) return 'Invalid characters detected';
            return '';
        },
        email(value) {
            if (!value.trim()) return 'Email field is required';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Enter a valid email address';
            return '';
        },
        password(value) {
            if (!value) return 'Password is required';
            if (value.length < 8) return 'Minimum 8 characters required';
            return '';
        }
    };

    function showFieldState(input, errorEl, msg) {
        if (msg) {
            errorEl.textContent = `// ERR: ${msg}`;
            errorEl.classList.add('visible');
            input.classList.remove('input-valid');
            input.classList.add('input-invalid');
        } else {
            errorEl.classList.remove('visible');
            input.classList.remove('input-invalid');
            if (input.value.trim()) input.classList.add('input-valid');
            else input.classList.remove('input-valid');
        }
    }

    // ═══════════════════════════════════════════════════════
    // PASSWORD STRENGTH CALCULATOR
    // ═══════════════════════════════════════════════════════
    const strengthLevels = [
        { label: 'WEAK',   color: '#ffb4ab' },  // error tone
        { label: 'FAIR',   color: '#FFD54F' },  // amber
        { label: 'GOOD',   color: '#00e475' },  // primary-fixed-dim
        { label: 'STRONG', color: '#62ff96' },  // primary-fixed
    ];

    function calcStrength(pw) {
        let score = 0;
        if (pw.length >= 8)  score++;
        if (pw.length >= 12) score++;
        if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
        if (/\d/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        // Map 0-5 → 0-3
        return Math.min(Math.floor(score * 0.75), 3);
    }

    function updateStrengthMeter(pw) {
        const segments = strengthContainer.querySelectorAll('.strength-segment');
        if (!pw) {
            segments.forEach(s => s.style.background = 'rgba(59,74,61,0.4)');
            strengthLabel.style.color = 'transparent';
            strengthLabel.textContent = '';
            return;
        }
        const level = calcStrength(pw);
        const { label, color } = strengthLevels[level];
        segments.forEach((seg, i) => {
            seg.style.background = i <= level ? color : 'rgba(59,74,61,0.4)';
        });
        strengthLabel.textContent = `// ${label}`;
        strengthLabel.style.color = color;
    }

    // ═══════════════════════════════════════════════════════
    // REAL-TIME VALIDATION (on input + blur)
    // ═══════════════════════════════════════════════════════
    nameInput.addEventListener('blur', () => {
        showFieldState(nameInput, nameError, validators.name(nameInput.value));
    });
    emailInput.addEventListener('blur', () => {
        showFieldState(emailInput, emailError, validators.email(emailInput.value));
    });
    passwordInput.addEventListener('blur', () => {
        showFieldState(passwordInput, pwError, validators.password(passwordInput.value));
    });

    // Clear error as soon as user starts fixing
    nameInput.addEventListener('input', () => {
        if (nameError.classList.contains('visible'))
            showFieldState(nameInput, nameError, validators.name(nameInput.value));
        else if (nameInput.value.trim()) nameInput.classList.add('input-valid');
        else nameInput.classList.remove('input-valid');
    });
    emailInput.addEventListener('input', () => {
        if (emailError.classList.contains('visible'))
            showFieldState(emailInput, emailError, validators.email(emailInput.value));
        else if (emailInput.value.trim()) emailInput.classList.add('input-valid');
        else emailInput.classList.remove('input-valid');
    });
    passwordInput.addEventListener('input', () => {
        updateStrengthMeter(passwordInput.value);
        if (pwError.classList.contains('visible'))
            showFieldState(passwordInput, pwError, validators.password(passwordInput.value));
    });

    // ═══════════════════════════════════════════════════════
    // FORM SUBMISSION
    // ═══════════════════════════════════════════════════════
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Run all validations
        const nameMsg  = validators.name(nameInput.value);
        const emailMsg = validators.email(emailInput.value);
        const pwMsg    = validators.password(passwordInput.value);

        showFieldState(nameInput,     nameError,  nameMsg);
        showFieldState(emailInput,    emailError, emailMsg);
        showFieldState(passwordInput, pwError,    pwMsg);

        if (nameMsg || emailMsg || pwMsg) {
            form.classList.add('shake');
            form.addEventListener('animationend', () => form.classList.remove('shake'), { once: true });
            return;
        }

        if (!termsCheckbox.checked) {
            termsCheckbox.closest('.flex').classList.add('shake');
            termsCheckbox.closest('.flex').addEventListener('animationend', function () {
                this.classList.remove('shake');
            }, { once: true });
            // Brief flash on the checkbox label
            const label = termsCheckbox.closest('.flex').querySelector('label');
            label.style.color = '#ffb4ab';
            setTimeout(() => label.style.color = '', 1500);
            return;
        }

        // ── Loading State ──
        submitBtn.classList.add('btn-loading');

        // Collect payload
        const payload = {
            name:  nameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value,
        };
        console.log('[code.grind] Sign-up payload:', payload);

        // Simulate async request (replace with real fetch)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Save User Data to Session
        const userData = {
            name: payload.name,
            email: payload.email,
            rank: "New Dev",
            tier: "Bronze",
            location: "Node.js",
            bio: "Student at TerminalSolve. Always learning, always building.",
            solved: 0,
            streak: 1,
            rank_num: 15402,
            accuracy: 0,
            avatar_seed: payload.name // Use name as seed for avatar
        };
        localStorage.setItem('terminal_user', JSON.stringify(userData));

        // Sync to Global DB
        fetch('/api/users/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: userData.name,
                email: userData.email,
                xp: 0,
                solved: 0,
                rank_num: 15402,
                avatar_seed: userData.avatar_seed
            })
        }).catch(e => console.error('[Signup Sync Error]', e));

        // ── Success State ──
        submitBtn.classList.remove('btn-loading');
        submitBtn.classList.add('btn-success');
        submitBtn.querySelector('.btn-text').textContent = '✓  ACCOUNT CREATED';
        submitBtn.querySelector('.btn-text').style.display = '';
        submitBtn.querySelector('.btn-spinner').style.display = 'none';

        // Disable form
        nameInput.disabled = true;
        emailInput.disabled = true;
        passwordInput.disabled = true;
        termsCheckbox.disabled = true;

        // Automatically redirect to the dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    });

    // ═══════════════════════════════════════════════════════
    // SOCIAL AUTH BUTTONS
    // ═══════════════════════════════════════════════════════
    socialBtns.forEach(btn => {
        const provider = btn.querySelector('span:last-child')?.textContent.trim();
        btn.addEventListener('click', () => {
            console.log(`[code.grind] Initiating ${provider} OAuth flow…`);
            btn.style.outline = '1px solid rgba(0, 228, 117, 0.6)';
            const label = btn.querySelector('span:last-child');
            const orig  = label.textContent;
            label.textContent = 'CONNECTING…';
            
            setTimeout(() => {
                label.textContent = orig;
                btn.style.outline = '';
                
                // Simulate Session Creation from Social
                const nameFromSocial = provider === 'Google' ? 'Google Developer' : 'GitHub Engineer';
                const userData = {
                    name: nameFromSocial,
                    email: `${provider.toLowerCase()}@auth.io`,
                    rank: "Cloud Dev",
                    tier: "Silver",
                    location: provider,
                    bio: `Connected via ${provider}.`,
                    solved: 5,
                    streak: 2,
                    rank_num: 890,
                    accuracy: 88,
                    avatar_seed: nameFromSocial
                };
                localStorage.setItem('terminal_user', JSON.stringify(userData));

                // Sync to Global DB
                fetch('/api/users/sync', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: userData.name,
                        email: userData.email,
                        xp: 1500, // Social base XP
                        solved: userData.solved,
                        rank_num: userData.rank_num,
                        avatar_seed: userData.avatar_seed
                    })
                }).catch(e => console.error('[Social Sync Error]', e));

                window.location.href = 'dashboard.html';
            }, 1500);
        });
    });

});
