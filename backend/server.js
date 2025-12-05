// 🔧 File: backend/server.js
// 🔗 Farm Ready — entry point backend principale

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const toolsRoutes = require('./routes/tools');
const {
  PORT,
  FRONTEND_URL,
  PROJECT_NAME,
} = require('./core/config');
const { log } = require('./core/logger');
const { startCleanup, stopCleanup } = require('./core/cleanup');

const app = express();

// 🔧 Middleware di base
app.use(cors({ origin: FRONTEND_URL }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 🔧 Rotte principali
app.use('/api/auth', authRoutes);
app.use('/api/tools', toolsRoutes);

// 🔧 Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: `${PROJECT_NAME} backend is running` });
});

// 🔧 Gestione errori
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  log('Errore non gestito', { level: 'error', error: err.message });
  res.status(500).json({ error: 'Errore interno', details: err.message });
});

app.listen(PORT, () => {
  log('Backend avviato', { port: PORT });
  // eslint-disable-next-line no-console
  console.log(`🚀 ${PROJECT_NAME} backend listening on port ${PORT}`);
  
  // Avvia cleanup periodico file temporanei
  startCleanup();
});

// Gestione graceful shutdown
process.on('SIGTERM', () => {
  log('SIGTERM ricevuto, shutdown graceful...', { level: 'info' });
  stopCleanup();
  process.exit(0);
});

process.on('SIGINT', () => {
  log('SIGINT ricevuto, shutdown graceful...', { level: 'info' });
  stopCleanup();
  process.exit(0);
});

