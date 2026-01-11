# Elysian Restaurant Website

Ein elegantes Restaurant-Website mit Admin-Authentifizierung.

## Features

- 🎨 Moderne, responsive Website für das Restaurant Elysian
- 🔐 Sicheres Admin-Authentifizierungssystem
- 👤 Automatische Admin-Account-Erstellung beim ersten Start
- 🔑 Zufällig generiertes, sicheres Passwort
- 📝 Reservierungssystem
- 🍽️ Speisekarte und Restaurant-Informationen

## Installation

### Voraussetzungen

- Node.js (Version 14 oder höher)
- npm (Node Package Manager)

### Setup

1. Repository klonen oder herunterladen

2. Abhängigkeiten installieren:
```bash
npm install
```

3. Server starten:
```bash
npm start
```

## Erster Start

Beim ersten Start des Servers wird automatisch:

1. Eine SQLite-Datenbank erstellt (`elysian.db`)
2. Ein Admin-Account mit der E-Mail `admin@elysian.de` angelegt
3. Ein **zufälliges, sicheres Passwort** generiert
4. Das Passwort **in der Konsole ausgegeben**

### ⚠️ WICHTIG: Admin-Passwort

Das Admin-Passwort wird **nur beim ersten Start** in der Konsole angezeigt!

Beispielausgabe:
```
===========================================
FIRST STARTUP DETECTED
===========================================

✓ Admin account created successfully!
===========================================
ADMIN CREDENTIALS (SAVE THESE!)
===========================================
Email:     admin@elysian.de
Password:  Xy9$mK2#pL5@wN8!
===========================================
⚠ This password will NOT be shown again!
===========================================
```

**Speichern Sie das Passwort sofort an einem sicheren Ort!**

## Verwendung

### Anmeldung

1. Öffnen Sie Ihren Browser und navigieren zu `http://localhost:3000`
2. Sie werden automatisch zur Login-Seite weitergeleitet
3. Melden Sie sich mit den Admin-Credentials an:
   - E-Mail: `admin@elysian.de`
   - Passwort: (Das beim ersten Start generierte Passwort)

### Zugriffsbeschränkungen

- **Nur der Admin-Account** (`admin@elysian.de`) kann sich anmelden
- Andere E-Mail-Adressen werden abgelehnt
- Alle Seiten sind nur nach erfolgreicher Anmeldung zugänglich

### Abmelden

Klicken Sie auf den "Abmelden"-Button in der Navigation, um sich auszuloggen.

## Technische Details

### Backend
- **Node.js** mit Express.js Framework
- **SQLite3** Datenbank für Benutzerverwaltung
- **bcrypt** für sichere Passwort-Hashing
- **express-session** für Session-Management

### Sicherheitsfeatures
- Passwörter werden mit bcrypt gehasht (Salt-Runden: 10)
- Sichere Passwortgenerierung mit crypto.randomBytes
- Session-basierte Authentifizierung
- Middleware-geschützte Routen
- Nur Admin-Account hat Systemzugriff

### Datenbankschema

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'instructor',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## API Endpoints

### POST /api/login
Anmeldung für Benutzer

**Request Body:**
```json
{
  "email": "admin@elysian.de",
  "password": "your-password"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login erfolgreich!",
  "redirectUrl": "/index.html"
}
```

### POST /api/logout
Abmeldung des aktuellen Benutzers

**Response:**
```json
{
  "success": true,
  "message": "Erfolgreich abgemeldet."
}
```

### GET /api/auth-status
Überprüft den Authentifizierungsstatus

**Response:**
```json
{
  "authenticated": true,
  "user": {
    "email": "admin@elysian.de",
    "role": "admin"
  }
}
```

## Projektstruktur

```
elysian/
├── css/                    # Stylesheets
│   ├── navigation.css
│   ├── nav-impressum.css
│   └── style.css
├── images/                 # Bilder und Medien
├── js/                     # JavaScript-Dateien
│   └── general.js
├── index.html             # Hauptseite (geschützt)
├── login.html             # Login-Seite (öffentlich)
├── imprint.html           # Impressum (geschützt)
├── dataProtection.html    # Datenschutz (geschützt)
├── server.js              # Express.js Server
├── package.json           # npm Konfiguration
├── .gitignore            # Git Ausschlussliste
└── README.md             # Diese Datei
```

## Entwicklung

### Server im Entwicklungsmodus starten
```bash
npm run dev
```

### Port ändern
Der Server läuft standardmäßig auf Port 3000. Um einen anderen Port zu verwenden:
```bash
PORT=8080 npm start
```

## Troubleshooting

### "Ich habe das Admin-Passwort vergessen"

Da das Passwort nur beim ersten Start angezeigt wird, müssen Sie:

1. Server stoppen
2. Datenbank löschen: `rm elysian.db`
3. Server neu starten: `npm start`
4. Neues Passwort aus der Konsole kopieren

### "Cannot find module 'express'"

Installieren Sie die Abhängigkeiten:
```bash
npm install
```

### "Port already in use"

Ein anderer Prozess verwendet Port 3000. Entweder:
- Stoppen Sie den anderen Prozess
- Verwenden Sie einen anderen Port: `PORT=8080 npm start`

## Lizenz

Dieses Projekt wurde für Bildungszwecke erstellt.

## Autoren

- Manuel, Sophie, Hannah, Theresa (MSHT Team)
