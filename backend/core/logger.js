// 🔧 File: backend/core/logger.js
// 🔗 Farm Ready — logging centralizzato compatibile con AI Farm

const fs = require('fs');
const path = require('path');
const { LOG_DIR, PROJECT_NAME } = require('./config');

const EXECUTIONS_LOG = path.resolve(LOG_DIR, 'executions.log');

/**
 * 🔧 Scrive una riga JSON nel log centralizzato.
 * Ogni tool deve registrare almeno requestId, tool e status.
 */
function logExecution(entry) {
  const payload = {
    timestamp: Date.now(),
    project: PROJECT_NAME,
    ...entry,
  };

  const line = `${JSON.stringify(payload)}\n`;

  fs.appendFileSync(EXECUTIONS_LOG, line, { encoding: 'utf8' });
}

/**
 * 🔧 Wrapper generico per log applicativi (console + file in futuro).
 */
function log(message, context = {}) {
  const payload = {
    timestamp: new Date().toISOString(),
    message,
    ...context,
  };

  // 🧠 Per ora stampiamo in console; in futuro potremo inviare a sistemi esterni.
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(payload));
}

module.exports = {
  logExecution,
  log,
};

