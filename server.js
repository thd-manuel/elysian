const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Database setup
const db = new sqlite3.Database('./elysian.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        initializeDatabase();
    }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Session configuration
app.use(session({
    secret: crypto.randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Set to true in production with HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Generate secure random password
function generateSecurePassword(length = 16) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';
    const randomBytes = crypto.randomBytes(length);
    
    for (let i = 0; i < length; i++) {
        password += charset[randomBytes[i] % charset.length];
    }
    
    return password;
}

// Initialize database and create admin on first run
function initializeDatabase() {
    // Create users table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'instructor',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating users table:', err.message);
            return;
        }
        
        // Check if this is the first run (no users exist)
        db.get('SELECT COUNT(*) as count FROM users', [], async (err, row) => {
            if (err) {
                console.error('Error checking users:', err.message);
                return;
            }
            
            if (row.count === 0) {
                console.log('\n===========================================');
                console.log('FIRST STARTUP DETECTED');
                console.log('===========================================');
                
                // Generate secure random password
                const randomPassword = generateSecurePassword();
                const adminEmail = 'admin@elysian.de';
                
                // Hash the password
                bcrypt.hash(randomPassword, 10, (err, hash) => {
                    if (err) {
                        console.error('Error hashing password:', err.message);
                        return;
                    }
                    
                    // Insert admin user
                    db.run(
                        'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
                        [adminEmail, hash, 'admin'],
                        (err) => {
                            if (err) {
                                console.error('Error creating admin user:', err.message);
                            } else {
                                console.log('\n✓ Admin account created successfully!');
                                console.log('===========================================');
                                console.log('ADMIN CREDENTIALS (SAVE THESE!)');
                                console.log('===========================================');
                                console.log('Email:    ', adminEmail);
                                console.log('Password: ', randomPassword);
                                console.log('===========================================');
                                console.log('⚠ This password will NOT be shown again!');
                                console.log('===========================================\n');
                            }
                        }
                    );
                });
            } else {
                console.log('✓ Database initialized. Existing users found.');
            }
        });
    });
}

// Authentication middleware
function requireAuth(req, res, next) {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.redirect('/login.html');
    }
}

// Check if user is admin
function isAdmin(req, res, next) {
    if (req.session && req.session.userRole === 'admin') {
        next();
    } else {
        res.status(403).send('Access denied. Admin privileges required.');
    }
}

// Routes

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email und Passwort sind erforderlich.' });
    }
    
    // Only allow admin@elysian.de to login
    if (email !== 'admin@elysian.de') {
        return res.status(401).json({ 
            success: false, 
            message: 'Zugriff verweigert. Nur der Administrator kann sich anmelden.' 
        });
    }
    
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ success: false, message: 'Serverfehler.' });
        }
        
        if (!user) {
            return res.status(401).json({ success: false, message: 'Ungültige Anmeldedaten.' });
        }
        
        // Verify password
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err.message);
                return res.status(500).json({ success: false, message: 'Serverfehler.' });
            }
            
            if (result) {
                // Password is correct, create session
                req.session.userId = user.id;
                req.session.userEmail = user.email;
                req.session.userRole = user.role;
                
                return res.json({ 
                    success: true, 
                    message: 'Login erfolgreich!',
                    redirectUrl: '/index.html'
                });
            } else {
                return res.status(401).json({ success: false, message: 'Ungültige Anmeldedaten.' });
            }
        });
    });
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err.message);
            return res.status(500).json({ success: false, message: 'Fehler beim Abmelden.' });
        }
        res.json({ success: true, message: 'Erfolgreich abgemeldet.' });
    });
});

// Check authentication status
app.get('/api/auth-status', (req, res) => {
    if (req.session && req.session.userId) {
        res.json({ 
            authenticated: true,
            user: {
                email: req.session.userEmail,
                role: req.session.userRole
            }
        });
    } else {
        res.json({ authenticated: false });
    }
});

// Protect main pages (except login page)
app.get('/index.html', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/imprint.html', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'imprint.html'));
});

app.get('/dataProtection.html', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'dataProtection.html'));
});

// Redirect root to index
app.get('/', requireAuth, (req, res) => {
    res.redirect('/index.html');
});

// Start server
app.listen(PORT, () => {
    console.log(`\n✓ Server running on http://localhost:${PORT}`);
    console.log('✓ Press Ctrl+C to stop\n');
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('\n✓ Database connection closed.');
        }
        process.exit(0);
    });
});
