const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const sqlFiles = [
    path.join(__dirname, 'database', 'database.sql'),
    path.join(__dirname, 'database', 'database_questions.sql'),
    path.join(__dirname, 'database', 'jsdatabase.sql'),
    path.join(__dirname, 'database', 'algo_ds_questions.sql'),
    path.join(__dirname, 'database', 'language_questions.sql')
];

console.log('--- TerminalSolve Database Initializer ---');

// We don't delete the file, just drop tables
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
        process.exit(1);
    }
    console.log('[1/3] Connected to SQLite.');
});

async function initialize() {
    try {
        console.log('[2/3] Cleaning existing tables...');
        await new Promise((resolve, reject) => {
            db.exec(`
                DROP TABLE IF EXISTS problem_tags;
                DROP TABLE IF EXISTS problems;
            `, (err) => err ? reject(err) : resolve());
        });

        console.log('[3/3] Seeding data from SQL files...');
        for (const file of sqlFiles) {
            console.log(`  > Processing: ${path.basename(file)}`);
            let content = fs.readFileSync(file, 'utf8');
            
            // Clean content: Replace SERIAL and Ensure INSERT OR IGNORE
            content = content
                .replace(/SERIAL PRIMARY KEY/g, 'INTEGER PRIMARY KEY AUTOINCREMENT')
                .replace(/INSERT INTO/g, 'INSERT OR IGNORE INTO');

            await new Promise((resolve, reject) => {
                db.exec(content, (err) => {
                    if (err) {
                        console.error(`  [ERROR] In ${path.basename(file)}:`, err.message);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        }

        console.log('✅ Database successfully initialized!');
    } catch (err) {
        console.error('❌ Initialization failed.');
    } finally {
        db.close();
    }
}

initialize();
