const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'codegrind_secret_key_88',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'frontend')));

// Root Redirect to Signup
app.get('/', (req, res) => {
    res.redirect('/signup.html');
});

// Connect to SQLite Database
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to connect to database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        autoSeed(); // Run auto-seeding on boot
    }
});

// --- AUTO-SEEDING ENGINE (For Live Server) ---
function autoSeed() {
    const fs = require('fs');
    const sqlFiles = [
        path.join(__dirname, 'database', 'database.sql'),
        path.join(__dirname, 'database', 'database_questions.sql'),
        path.join(__dirname, 'database', 'jsdatabase.sql'),
        path.join(__dirname, 'database', 'algo_ds_questions.sql'),
        path.join(__dirname, 'database', 'language_questions.sql')
    ];

    db.get("SELECT COUNT(*) as count FROM problems", (err, row) => {
        if (err || !row || row.count === 0) {
            console.log('[AutoSeed] Library is empty or missing. Initializing schema and 105+ problems...');
            sqlFiles.forEach(file => {
                if (fs.existsSync(file)) {
                    console.log(`  > Batch Syncing: ${path.basename(file)}`);
                    let content = fs.readFileSync(file, 'utf8')
                        .replace(/SERIAL PRIMARY KEY/g, 'INTEGER PRIMARY KEY AUTOINCREMENT')
                        .replace(/INSERT INTO/g, 'INSERT OR IGNORE INTO');
                    
                    db.exec(content, (err) => {
                        if (err) console.error(`  [!] Sync Error in ${path.basename(file)}:`, err.message);
                    });
                }
            });
        } else {
            console.log(`[AutoSeed] System ready. Found ${row.count} active problems.`);
        }
    });

    // Ensure 'users' table exists for social login
    db.exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        xp INTEGER DEFAULT 0,
        solved_count INTEGER DEFAULT 0,
        rank_num INTEGER DEFAULT 15000,
        avatar_seed VARCHAR(255),
        last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);
}

// API Routes

// GET all problems with their tags
app.get('/api/problems', (req, res) => {
    const problemsQuery = `SELECT * FROM problems ORDER BY id ASC`;
    const tagsQuery = `SELECT * FROM problem_tags`;

    db.all(problemsQuery, [], (err, problems) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        db.all(tagsQuery, [], (err, tags) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Map tags to their respective problems
            const problemsWithTags = problems.map(prob => {
                prob.tags = tags
                    .filter(t => t.problem_id === prob.id)
                    .map(t => t.tag_name);
                return prob;
            });

            res.json({
                message: "success",
                data: problemsWithTags
            });
        });
    });
});
// GET single problem by ID
app.get('/api/problems/:id', (req, res) => {
    const { id } = req.params;
    const problemQuery = `SELECT * FROM problems WHERE id = ?`;
    const tagsQuery = `SELECT * FROM problem_tags WHERE problem_id = ?`;

    db.get(problemQuery, [id], (err, problem) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!problem) return res.status(404).json({ error: "Problem not found" });

        db.all(tagsQuery, [id], (err, tags) => {
            if (err) return res.status(500).json({ error: err.message });
            problem.tags = tags.map(t => t.tag_name);
            res.json({ message: "success", data: problem });
        });
    });
});

// GET single problem by Number
app.get('/api/problems/num/:num', (req, res) => {
    const { num } = req.params;
    const problemQuery = `SELECT * FROM problems WHERE problem_number = ?`;
    
    db.get(problemQuery, [num], (err, problem) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!problem) return res.status(404).json({ error: "Problem not found" });

        const tagsQuery = `SELECT * FROM problem_tags WHERE problem_id = ?`;
        db.all(tagsQuery, [problem.id], (err, tags) => {
            if (err) return res.status(500).json({ error: err.message });
            problem.tags = tags.map(t => t.tag_name);
            res.json({ message: "success", data: problem });
        });
    });
});

// Start Server
// --- USER & LEADERBOARD SYSTEM ---

// Sync user data from frontend to global database
app.post('/api/users/sync', (req, res) => {
    const { name, email, xp, solved, rank_num, avatar_seed } = req.body;
    
    if (!email) return res.status(400).json({ error: "Email is required" });

    // SQLite UPSERT logic (INSERT INTO ... ON CONFLICT)
    const query = `
        INSERT INTO users (name, email, xp, solved_count, rank_num, avatar_seed, last_active)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(email) DO UPDATE SET
            xp = excluded.xp,
            solved_count = excluded.solved_count,
            rank_num = MIN(users.rank_num, excluded.rank_num),
            last_active = CURRENT_TIMESTAMP;
    `;

    db.run(query, [name, email, xp, solved, rank_num, avatar_seed], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Sync successful", userId: this.lastID });
    });
});

// Get global leaderboard
app.get('/api/leaderboard', (req, res) => {
    const query = `
        SELECT name, xp, solved_count as solved, rank_num, avatar_seed 
        FROM users 
        ORDER BY xp DESC 
        LIMIT 50
    `;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "success", data: rows });
    });
});

// --- OAUTH STRATEGIES (Placeholders for Keys) ---
// Note: In production, store these in Environment Variables
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'your-google-id';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'your-google-secret';
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'your-github-id';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || 'your-github-secret';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

// Auth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/signup.html' }), (req, res) => {
    res.redirect('/auth/success');
});

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/signup.html' }), (req, res) => {
    res.redirect('/auth/success');
});

// Post-Login Success Route
app.get('/auth/success', (req, res) => {
    if (!req.user) return res.redirect('/signup.html');
    
    // Pass user info to a temporary page that saves to localStorage
    const userData = {
        name: req.user.displayName || req.user.username,
        email: req.user.emails ? req.user.emails[0].value : 'no-email@auth.io',
        avatar_seed: req.user.photos ? req.user.photos[0].value : (req.user.displayName || 'Dev'),
        social_id: req.user.id
    };
    
    res.send(`
        <script>
            const socialUser = ${JSON.stringify(userData)};
            const localData = {
                name: socialUser.name,
                email: socialUser.email,
                avatar_seed: socialUser.avatar_seed,
                points: 0, solved: 0, solved_ids: [], rank_num: 15402, rank: "New Dev", tier: "Bronze"
            };
            localStorage.setItem('terminal_user', JSON.stringify(localData));
            
            // Pulse to global leaderboard DB
            fetch('/api/users/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: localData.name,
                    email: localData.email,
                    xp: 0, solved: 0, rank_num: 15402,
                    avatar_seed: localData.avatar_seed
                })
            }).then(() => {
                window.location.href = '/dashboard.html';
            }).catch(() => {
                window.location.href = '/dashboard.html';
            });
        </script>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Primary Entry Point: http://localhost:${PORT}/signup.html`);
});
