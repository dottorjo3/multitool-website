# 🚀 Istruzioni Setup Bibble 2.0

## ⚠️ IMPORTANTE: Crea il file .env

Il file `.env.example` potrebbe non essere stato creato automaticamente. **Crea manualmente** un file `.env` nella cartella root (usa i valori reali per produzione):

```env
# Backend Configuration
PORT=4000
FRONTEND_URL=http://localhost:3000

# Database Configuration (opzionale)
# Lascia vuoto per usare lo store in-memory
DATABASE_URL=
MONGO_URL=

# Security - IMPORTANTE: Cambia questo valore!
JWT_SECRET=change_this_secret_to_something_very_long_and_random_123456789

# Free Tier Limits
FREE_TIER_LIMIT=10
FREE_TIER_DAILY_LIMIT=50

# File Upload
MAX_FILE_SIZE=104857600
UPLOAD_DIR=./tmp

# API Keys (opzionali per tool avanzati)
OPENAI_API_KEY=
HUGGINGFACE_API_KEY=

# Environment
NODE_ENV=development
```

## 📋 Checklist Setup Completo

### ✅ Fase 1: Struttura Base (COMPLETATA)
- [x] Creato `package.json` root con script bootstrap
- [x] Creato struttura backend (`/backend`)
- [x] Creato struttura frontend (già esistente)
- [x] Creato file `.gitignore`

### ✅ Fase 2: Backend Core (COMPLETATA)
- [x] Creato `backend/server.js` - Server Express
- [x] Creato `backend/routes/auth.js` - Autenticazione
- [x] Creato `backend/routes/tools.js` - API Tools
- [x] Creato `backend/services/toolRunner.js` - Esecuzione tool
- [x] Creato `backend/db/tools_registry.json` - Registry tool
- [x] Creato `backend/db/migrations/0001_init.sql` - Schema DB

### ✅ Fase 3: Frontend Integration (COMPLETATA)
- [x] Creato `frontend/src/services/api.js` - API client
- [x] Creato `frontend/src/components/ToolRunner.js` - Runner generico
- [x] Creato `frontend/src/components/ToolCard.js` - Card tool
- [x] Creato `frontend/src/pages/Login.js` - Login page
- [x] Creato `frontend/src/pages/ToolPage.js` - Pagina tool
- [x] Aggiornato `frontend/src/pages/ToolsPage.js` - Lista da API
- [x] Aggiornato `frontend/src/App.js` - Route complete
- [x] Aggiornato `frontend/src/components/Navbar.js` - Login/Logout

### ⏭️ Prossimi Passi

1. **Crea file `.env`** (vedi sopra)
2. **Installa dipendenze:**
   ```bash
   npm run bootstrap
   ```
3. **Avvia backend:**
   ```bash
   cd backend
   npm start
   ```
4. **Avvia frontend (nuovo terminale):**
   ```bash
   cd frontend
   npm start
   ```
5. *(Opzionale)* **Configura PostgreSQL:**
   ```bash
   psql "$DATABASE_URL" -f backend/db/migrations/0001_init.sql
   ```
   Se non imposti `DATABASE_URL`, il backend userà lo store in memoria + file JSON (`var/multitool/usage/`).
6. **Testa l'applicazione:** apri `http://localhost:3000` e prova alcuni tool (PDF, AI, Video...)

## 📝 Note

- I tool premium richiedono login; usa `demo@bibble.local / demo123`
- Refresh token e usage log vengono salvati in `var/multitool/usage/`
- Tool Factory CLI (`npm run tool:factory`) genera backend/schema/frontend + docs
- Consulta `IMPLEMENTATION_STATUS.md` e `IMPLEMENTATION_COMPLETE.md` per panoramica aggiornata

## 🚀 Stato Progetto

**Fase 1: Setup Architettura Base** ✅ COMPLETATA
**Fase 2: Core Backend** ✅ COMPLETATA  
**Fase 3: Frontend Integration** ✅ COMPLETATA

**Prossima Fase:** Espansione tool PDF + integrazione database utenti premium

