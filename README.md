# 🚀 Bibble 2.0 - Tool Empire

Piattaforma multitool mondiale con 1000+ strumenti gratuiti.

## 📋 Prerequisiti

- Node.js 18+ 
- npm o yarn
- PostgreSQL (opzionale per produzione)
- MongoDB (opzionale)

## 🚀 Setup Rapido

### 1. Installazione Dipendenze

Apri il Terminal nella cartella root del progetto e esegui:

```bash
npm run bootstrap
```

Questo comando installerà tutte le dipendenze per backend e frontend.

### 2. Configurazione Ambiente

Crea un file `.env` nella cartella root copiando `.env.example`:

```bash
cp .env.example .env
```

Poi apri il file `.env` e modifica:
- `JWT_SECRET`: usa una stringa lunga e casuale (es: `openssl rand -hex 32`)
- `DATABASE_URL`: se usi PostgreSQL, inserisci la tua connection string
- `MONGO_URL`: se usi MongoDB, inserisci la tua connection string

### 3. Avvio Backend

Apri un Terminal e esegui:

```bash
cd backend
npm start
```

Il backend sarà disponibile su `http://localhost:4000`

### 4. Avvio Frontend

Apri un NUOVO Terminal (lascia il backend in esecuzione) e esegui:

```bash
cd frontend
npm start
```

Il frontend sarà disponibile su `http://localhost:3000`

## 📁 Struttura Progetto

```
bibble-recovery/
├── backend/          # Server Node.js + Express
│   ├── routes/       # Route API
│   ├── services/     # Logica business
│   ├── db/           # Database e migrations
│   └── utils/         # Utilità
├── frontend/         # React App
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
└── docs/             # Documentazione
```

## 🛠️ Sviluppo

### Backend Development

```bash
cd backend
npm run dev
```

### Frontend Development

```bash
cd frontend
npm start
```

### Tool Factory CLI

Per generare la struttura completa di un nuovo tool (backend + schema + frontend):

```bash
npm run tool:factory
```

Lo script chiede ID, nome, categoria, descrizione e tier (free/premium), quindi genera:
- Runner backend + schema AJV
- Modulo React + registrazioni frontend/backend
- Documento tecnico in `docs/tools/<toolId>.md`

Blueprint disponibili:
- `text-basic` – input textarea, output testo
- `file-single` – elabora un singolo file alla volta
- `file-multi` – batch processing con output ZIP
- `ai-text` – stub AI pronto per Farm Connector

Guida completa: `docs/TOOL_FACTORY.md`.

## 📚 API Endpoints

- `GET /api/tools` - Lista tutti i tool
- `GET /api/tools/:toolId` - Dettagli di un tool
- `POST /api/tools/:toolId/run` - Esegui un tool
- `POST /api/auth/login` - Login utente
- `POST /api/auth/restore-demo-user` - Crea demo user per test
- `POST /api/auth/refresh` - Genera nuovo access token via refresh token
- `POST /api/auth/logout` - Invalida refresh token corrente

## 🌐 Pagine Rapide
- `/pdf-tools` — Impero PDF
- `/image-tools` — Image Lab
- `/video-tools` — Video Lab
- `/ai-tools` — AI Lab (tool premium + freemium)

## 🗄️ Database (Opzionale)
- Configura `DATABASE_URL` per utilizzare PostgreSQL (fallback automatico a store in-memory se non impostato)
- Esegui la migration `backend/db/migrations/0001_init.sql`
- Token refresh persistiti in `var/multitool/usage/tokens.json` se il database non è disponibile

## 🎯 Roadmap

- [x] Setup architettura base
- [ ] Backend API completo
- [ ] Frontend integration
- [ ] Multilingua (IT/EN)
- [ ] Primi 50 tool
- [ ] Sistema freemium
- [ ] 300+ tool totali

## 📝 Note

Per ogni tool implementato viene creato un documento in `docs/tools/<toolId>.md` con note tecniche e next steps.

## 🍕 Supporta il Progetto

"Offrimi un pezzo di pizza 🍕" - Donazioni sempre benvenute!

