# 📋 Istruzioni Ripristino Bibble 2.0

## 🚀 Setup Iniziale

### 1. Installazione Dipendenze

Apri il **Terminal** nella cartella root del progetto e esegui:

```bash
npm run bootstrap
```

Questo comando installerà automaticamente tutte le dipendenze per:
- Backend (Node.js + Express)
- Frontend (React)

**Output atteso:** Vedi i progressi di installazione per entrambe le cartelle.

### 2. Configurazione Ambiente

Crea un file `.env` nella cartella root:

**Windows (PowerShell):**
```powershell
Copy-Item .env.example .env
```

**Mac/Linux:**
```bash
cp .env.example .env
```

Poi apri il file `.env` con un editor di testo e modifica:

- `JWT_SECRET`: Genera una stringa casuale lunga (es: usa `openssl rand -hex 32` nel terminale)
- `DATABASE_URL`: Se usi PostgreSQL, inserisci la tua connection string
- `MONGO_URL`: Se usi MongoDB, inserisci la tua connection string

**Nota:** Per ora puoi lasciare i valori di default se non hai database configurati.

### 3. Avvio Backend

Apri un **Terminal** e esegui:

```bash
cd backend
npm start
```

**Output atteso:** 
```
🚀 Bibble backend listening on port 4000
📡 API available at http://localhost:4000/api
```

**Verifica:** Apri il browser su `http://localhost:4000/api/health` - dovresti vedere:
```json
{"status":"ok","message":"Bibble backend is running"}
```

### 4. Avvio Frontend

Apri un **NUOVO Terminal** (lascia il backend in esecuzione) e esegui:

```bash
cd frontend
npm start
```

**Output atteso:** Il browser si aprirà automaticamente su `http://localhost:3000`

## ✅ Test Rapido

### Test Backend API

1. Apri il browser su `http://localhost:4000/api/tools`
2. Dovresti vedere una lista JSON con tutti i tool registrati

### Test Frontend

1. Vai su `http://localhost:3000`
2. Clicca su "All Tools"
3. Dovresti vedere la lista di tool caricata dall'API

### Test Login

1. Vai su `http://localhost:3000/login`
2. Clicca su "Use Demo User (for testing)"
3. Dovresti essere reindirizzato alla home e vedere il tuo nome nella navbar

### Test Tool

1. Vai su `http://localhost:3000/tools`
2. Clicca su un tool (es: "JSON Formatter")
3. Inserisci del testo JSON e clicca "Execute"
4. Dovresti vedere l'output formattato

## 🛠️ Struttura File Creati

```
bibble-recovery/
├── package.json              # Script root
├── .env.example              # Template variabili ambiente
├── README.md                 # Documentazione principale
├── backend/
│   ├── server.js            # Server Express principale
│   ├── routes/
│   │   ├── auth.js          # Route autenticazione
│   │   └── tools.js          # Route tools API
│   ├── services/
│   │   └── toolRunner.js    # Esecuzione tool
│   └── db/
│       ├── tools_registry.json  # Registry tool
│       └── migrations/
│           └── 0001_init.sql    # Schema database
└── frontend/
    └── src/
        ├── services/
        │   └── api.js        # Client API
        ├── components/
        │   ├── ToolRunner.js # Componente esecuzione tool
        │   └── ToolCard.js   # Card tool
        └── pages/
            ├── ToolsPage.js  # Lista tool
            ├── ToolPage.js   # Pagina singolo tool
            └── Login.js      # Pagina login
```

## 🔧 Troubleshooting

### Errore: "Cannot find module"
**Soluzione:** Esegui `npm run bootstrap` nella root

### Errore: "Port already in use"
**Soluzione:** Cambia la porta nel file `.env` (es: `PORT=4001`)

### Errore: "CORS error"
**Soluzione:** Verifica che `FRONTEND_URL` in `.env` corrisponda all'URL del frontend

### Backend non risponde
**Soluzione:** 
1. Verifica che il backend sia in esecuzione
2. Controlla i log nel terminale per errori
3. Verifica che la porta 4000 non sia usata da altro processo

## 📝 Prossimi Passi

1. ✅ Setup completato
2. ⏭️ Implementare più tool nel `toolRunner.js`
3. ⏭️ Aggiungere tool al `tools_registry.json`
4. ⏭️ Configurare database PostgreSQL (opzionale)
5. ⏭️ Implementare sistema freemium

## 🆘 Supporto

Se hai problemi, controlla:
- I log nel terminale del backend
- La console del browser (F12) per errori frontend
- Il file `README.md` per documentazione completa

