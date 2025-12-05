// 🔧 File: backend/core/cleanup.js
// 🔗 Gestione pulizia file temporanei e risorse

const fs = require('fs').promises;
const path = require('path');
const { TMP_DIR } = require('./config');
const { log } = require('./logger');

// 🔧 Configurazione cleanup
const CLEANUP_INTERVAL_MS = 3600000; // 1 ora
const FILE_MAX_AGE_MS = 1800000; // 30 minuti (file più vecchi vengono eliminati)

let cleanupInterval = null;

/**
 * 🔧 Rimuove file temporanei più vecchi di FILE_MAX_AGE_MS
 */
async function cleanupOldFiles() {
  try {
    const files = await fs.readdir(TMP_DIR);
    const now = Date.now();
    let cleaned = 0;
    let errors = 0;

    for (const file of files) {
      try {
        const filePath = path.join(TMP_DIR, file);
        const stats = await fs.stat(filePath);
        const age = now - stats.mtimeMs;

        if (age > FILE_MAX_AGE_MS) {
          await fs.unlink(filePath);
          cleaned++;
        }
      } catch (error) {
        errors++;
        log('Errore durante cleanup file', {
          level: 'warn',
          file,
          error: error.message,
        });
      }
    }

    if (cleaned > 0 || errors > 0) {
      log('Cleanup file temporanei completato', {
        level: 'info',
        cleaned,
        errors,
        total: files.length,
      });
    }
  } catch (error) {
    log('Errore durante cleanup file temporanei', {
      level: 'error',
      error: error.message,
    });
  }
}

/**
 * 🔧 Avvia cleanup periodico
 */
function startCleanup() {
  if (cleanupInterval) {
    return; // Già avviato
  }

  // Esegui cleanup immediato all'avvio
  cleanupOldFiles();

  // Poi esegui periodicamente
  cleanupInterval = setInterval(cleanupOldFiles, CLEANUP_INTERVAL_MS);

  log('Cleanup periodico avviato', {
    level: 'info',
    interval: CLEANUP_INTERVAL_MS,
    maxAge: FILE_MAX_AGE_MS,
  });
}

/**
 * 🔧 Ferma cleanup periodico
 */
function stopCleanup() {
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
    cleanupInterval = null;
    log('Cleanup periodico fermato', { level: 'info' });
  }
}

/**
 * 🔧 Rimuove un file specifico
 */
async function removeFile(filePath) {
  try {
    await fs.unlink(filePath);
    return true;
  } catch (error) {
    // Ignora errori se il file non esiste
    if (error.code !== 'ENOENT') {
      log('Errore rimozione file', {
        level: 'warn',
        filePath,
        error: error.message,
      });
    }
    return false;
  }
}

/**
 * 🔧 Rimuove multipli file
 */
async function removeFiles(filePaths) {
  const results = await Promise.allSettled(
    filePaths.map((filePath) => removeFile(filePath))
  );

  const successful = results.filter((r) => r.status === 'fulfilled' && r.value).length;
  const failed = results.length - successful;

  return { successful, failed, total: filePaths.length };
}

module.exports = {
  cleanupOldFiles,
  startCleanup,
  stopCleanup,
  removeFile,
  removeFiles,
};


