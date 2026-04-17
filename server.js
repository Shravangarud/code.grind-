const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

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

    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='problems'", (err, row) => {
        if (!row) {
            console.log('[AutoSeed] Database is fresh. Initializing schema and data...');
            sqlFiles.forEach(file => {
                if (fs.existsSync(file)) {
                    console.log(`  > Importing: ${path.basename(file)}`);
                    let content = fs.readFileSync(file, 'utf8')
                        .replace(/SERIAL PRIMARY KEY/g, 'INTEGER PRIMARY KEY AUTOINCREMENT')
                        .replace(/INSERT INTO/g, 'INSERT OR IGNORE INTO');
                    
                    db.exec(content, (err) => {
                        if (err) console.error(`  [!] Error In ${path.basename(file)}:`, err.message);
                    });
                }
            });
        }
    });
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

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Primary Entry Point: http://localhost:${PORT}/signup.html`);
});
